import React, { useEffect, useState } from "react";
import styles from "./basket.module.scss";
import axios from "axios";
import ProgressBar from "./progress";
import { MdDelete } from "react-icons/md";
import { Button } from "antd";
import { useGetCouponQuery } from "../../services/redux/couponApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetOneUserQuery,
  useUpdateUserMutation,
} from "../../services/redux/userApi";
import { usePostOrderMutation } from "../../services/redux/orderApi";

const Basket = () => {
  const userNotParsed = localStorage.getItem("user");
  let parsedUser = JSON.parse(userNotParsed);
  let userId = parsedUser?._id;
  if (parsedUser) {
    //const { data: user } =  useGetOneUserQuery(parsedUser?._id);
    //console.log(user);
    const [user,setUser] = useState({});
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");//
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const navigate = useNavigate();
    const [postOrders] = usePostOrderMutation();
    const [orders, setOrders] = useState([]);
    const [timers, setTimers] = useState({});
    const [promoCode, setPromoCode] = useState("");
    const [coupon, setCoupon] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [isPromoCodeVisible, setIsPromoCodeVisible] = useState(false);
    const { data: coupons } = useGetCouponQuery();
    const [updateUser] = useUpdateUserMutation();
    
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("http://localhost:3000/events");
          let storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
          console.log("userId : ",userId);
          var query = "http://localhost:3000/users/"+userId;
          console.log("query : ",query)
          const userResponse = await axios.get(query);
          console.log("userResponse : ",userResponse);
          setUser(userResponse.data.data);
          console.log("user : ",user)
          const userOrders = storedOrders.filter(
            (order) => order.userId == userResponse.data.data._id
          );
          console.log("userOrders : ",userOrders)

          const ordersWithEvents = userOrders.map((order) => {
            const event = response.data.data?.find(
              (event) => event._id === order.eventId
            );
            return { event, order };
          });
          console.log("ordersWithEvents : ",ordersWithEvents)
          setOrders(ordersWithEvents);

          const initialTimers = {};
          ordersWithEvents.forEach(({ order }) => {
            const startTime =
              localStorage.getItem(`timerStart_${order.seat}`) || Date.now();
            localStorage.setItem(`timerStart_${order.seat}`, startTime);
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = Math.max(15 * 60 - elapsedTime, 0);
            initialTimers[order.seat] = remainingTime;
          });
          setTimers(initialTimers);
        } catch (err) {
          console.log("Error:", err);
        }
      };

      fetchEvents();
    }, [userId]);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers };
          for (const seat in newTimers) {
            if (newTimers[seat] > 0) {
              newTimers[seat] -= 1;
            } else {
              removeOrder(seat);
            }
          }
          return newTimers;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [orders]);

    async function sendTicketByMail(email, content) {
      try {
        const response = await axios.post("http://localhost:3000/orderMail", {
          email,
          content,
        });
  
        if (response.status !== 200) {
          throw new Error("Failed to send email");
        }
  
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    };

    const getSeatIndices = (seat) => {
      const row = seat[0].charCodeAt(0) - "A".charCodeAt(0);
      const column = parseInt(seat.slice(1), 10) - 1;
      return { row, column };
    };

    const calculatePercentage = (remainingTime) => {
      const totalTime = 15 * 60;
      return (remainingTime / totalTime) * 100;
    };

    const removeOrder = async (seat) => {
      const orderToRemove = orders.find(({ order }) => order.seat === seat);
      if (orderToRemove && orderToRemove.event && orderToRemove.event.hall) {
        const { row, column } = getSeatIndices(seat);
        const eventCopy = { ...orderToRemove.event };
        eventCopy.hall.seats[row][column].isReserved = false;

        try {
          await axios.patch(
            `http://localhost:3000/events/${eventCopy._id}`,
            eventCopy
          );
          const updatedOrders = orders.filter(
            ({ order }) => order.seat !== seat
          );
          setOrders(updatedOrders);
          setTimers((prevTimers) => {
            const newTimers = { ...prevTimers };
            delete newTimers[seat];
            return newTimers;
          });

          const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
          const updatedStoredOrders = storedOrders.filter(
            (order) => order.seat !== seat || order.userId !== userId
          );
          localStorage.setItem("orders", JSON.stringify(updatedStoredOrders));

          localStorage.removeItem(`timerStart_${seat}`);
        } catch (err) {
          console.error("Error removing order:", err);
        }
      }
    };

    const getSeatPrice = (event, seat) => {
      const { row, column } = getSeatIndices(seat);
      const seatType = event.hall.seats[row][column].type;
      const standardPrice = event.price;

      switch (seatType) {
        case "vip":
          return standardPrice * 3;
        case "gold":
          return standardPrice * 2;
        case "silver":
          return standardPrice * 1.5;
        default:
          return standardPrice;
      }
    };

    const handleOrderClick = async () => {
      const totalAmount = orders.reduce(
        (total, { event, order }) => total + getSeatPrice(event, order.seat),
        0
      );

      const orderData = {
        orderDate: new Date(),
        userId: user._id,
        totalPrice: (totalAmount * (100 - percentage)) / 100,
        appliedCoupon: coupon,
        name,
        surname,
        email,
        phone,
        tickets: orders.map(({ event, order }) => ({
          eventId: event._id,
          seat: order.seat,
          price: getSeatPrice(event, order.seat),
        })),
      };
      console.log(paymentMethod)

      if (paymentMethod === "card") {
        localStorage.setItem("pendingOrder", JSON.stringify(orderData));
        setOrders([]);
        setTimers({});
        navigate("/bank-card");
      } 
      else if (paymentMethod === "wallet") {
        if (user.balance >= totalAmount) {
          const newUser = { ...user };
          newUser.balance -= parseInt(totalAmount);
          console.log("new user : ", newUser);
          localStorage.setItem("balanceUpdated", "true");

          await updateUser({ id: user._id, payload: newUser });

          localStorage.removeItem("pendingOrder");
          localStorage.removeItem("orders");
          await sendTicketByMail(orderData.email, "Ordered successfully");
          await postOrders(orderData);

          setOrders([]);
          setTimers({});
          Swal.fire({
            icon: "success",
            title: "Order placed successfully using wallet balance",
          });
        } 
        else {
          Swal.fire({
            icon: "error",
            title: "Insufficient wallet balance",
          });
        }
      }
    };

    const handlePromoCodeApply = () => {
      const coupon = coupons.data.find((c) => c.name === promoCode);
      const currentDate = new Date();

      if (coupon) {
        if (coupon.expireDate < currentDate) {
          alert("This coupon has expired");
          return;
        }
        if (coupon.usedLimit >= coupon.limit) {
          alert("This coupon has reached its usage limit");
          return;
        }

        setPercentage(coupon.percentage);
        setCoupon(coupon.name);
      } else {
        Swal.fire({
          icon: "error",
          title: "This promo code does not exist",
        });
        return;
      }
    };

    const totalAmount = orders.reduce(
      (total, { event, order }) => total + getSeatPrice(event, order.seat),
      0
    );

    return (
      <div className={styles.basket}>
        <div className="container">
          <h2>Basket</h2>
          <div className={styles.gridContainer}>
            <div className={styles.orders}>
              {orders.length === 0 ? (
                <p>No seats selected</p>
              ) : (
                orders.map(({ event, order }, index) => (
                  <div key={index} className={styles.orderItem}>
                    <div className={styles.time}>
                      <ProgressBar
                        percentage={calculatePercentage(
                          timers[order.seat] || 0
                        )}
                        time={formatTime(timers[order.seat] || 0)}
                      />
                    </div>
                    <div className={styles.ticketList}>
                      <div className={styles.img}>
                        <img
                          src={event.detailImg}
                          alt=""
                          width={120}
                          height={100}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className={styles.text}>
                        <p className={styles.name}>
                          {event?.hall.name} / {event.createdAt}
                        </p>
                        <p className={styles.title}>{event?.title}</p>
                        <p className={styles.seat}>Seat: {order.seat}</p>
                      </div>
                      <div className={styles.priceList}>
                        <div className={styles.price}>
                          <p className={styles.priceText}>
                            {getSeatPrice(event, order.seat)} ₼
                          </p>
                          <p className={styles.type}>
                            {
                              event.hall.seats[getSeatIndices(order.seat).row][
                                getSeatIndices(order.seat).column
                              ].type
                            }
                          </p>
                        </div>
                        <button
                          className={styles.delete}
                          onClick={() => removeOrder(order.seat)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className={styles.card}>
                <h3>Choose Payment Method</h3>
                <div
                  className={styles.paymentMethods}
                  style={{ display: "flex", gap: "20px" }}
                >
                  <div
                    className={`${styles.bottomSect} ${
                      paymentMethod === "card" && styles.activeTab
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className={styles.imgClass}>
                      <img
                        src="https://cdn.iticket.az/icons/delivery_methods/1.svg"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                    <span className={styles.wrapper}>Pay with Card</span>
                  </div>
                  <div
                    className={`${styles.bottomSect} ${
                      paymentMethod === "wallet" && styles.activeTab
                    }`}
                    onClick={() => setPaymentMethod("wallet")}
                  >
                    <div className={styles.imgClass}>
                      <img
                        src="https://cdn.iticket.az/icons/delivery_methods/3.svg"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                    <span className={styles.wrapper}>Pay with Wallet</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <h3>Delivery method</h3>
              <div className={styles.deliveryMethod}>
                <p className={styles.deliveryButton}>
                  E-ticket or voucher (in PDF)
                </p>
              </div>
              <div className={styles.userData}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="+994"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.promoCode}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPromoCodeVisible(true);
                  }}
                  className={styles.promo}
                >
                  I have a promo code
                </a>
                {isPromoCodeVisible && (
                  <div className={styles.promoInputSection}>
                    <input
                      type="text"
                      placeholder="PROMO"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={styles.promoInput}
                    />
                    <Button
                      onClick={handlePromoCodeApply}
                      className={styles.applyButton}
                      type="submit"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>
              <div className={styles.total}>
                <p>Total: {(totalAmount * (100 - percentage)) / 100} ₼</p>
              </div>
              <div className={styles.terms}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree with the terms and conditions.
                </label>
              </div>
              <Link >
                <Button
                  className={styles.createOrder}
                  onClick={handleOrderClick}
                >
                  Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Login required</div>;
  }
};

export default Basket;
