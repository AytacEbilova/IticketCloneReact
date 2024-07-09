import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetOneEventQuery,
  useUpdateEventMutation,
} from "../../services/redux/eventApi";
import styles from "./seat.module.scss";
import axios from "axios";
import { FaChair } from "react-icons/fa";
import Swal from "sweetalert2";

const SeatSelection = () => {
  const { id } = useParams();
  const { data: event, refetch } = useGetOneEventQuery(id);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatMapStyles, setSeatMapStyles] = useState({});
  const [prices, setPrices] = useState({});

  useEffect(() => {
    if (event) {
      const columns = event.data.hall.seats[0]?.length || 12;
      setSeatMapStyles({ "--columns": columns });

      const standardPrice = event.data.price;
      setPrices({
        vip: standardPrice * 3,
        gold: standardPrice * 2,
        silver: standardPrice * 1.5,
        standard: standardPrice,
      });
    }
  }, [event]);

  const updateEvent = async ({ id, payload }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/events/${id.toString()}`,
        payload
      );
      if (response.status === 200) {
        console.log("Event updated successfully:", response.data);
      } else {
        console.error("Failed to update event. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleSeatClick = (row, col) => {
    if (!event.data.hall.seats[row][col].isReserved) {
      const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
      setSelectedSeats((prev) =>
        prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
      );
    }
  };

  const handleConfirmSeats = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      Swal.fire({
        title: "Booked!",
        text: "Your seats have been booked.",
        icon: "success",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newOrders = selectedSeats.map((seat) => ({
            eventId: event.data._id,
            userId: user._id,
            seat,
          }));

          const newEvent = {
            ...event,
            data: {
              ...event.data,
              hall: {
                ...event.data.hall,
                seats: event.data.hall.seats.map((row) => [...row]),
              },
            },
          };

          const existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];
          const updatedOrders = [...existingOrders, ...newOrders];
          localStorage.setItem("orders", JSON.stringify(updatedOrders));

          selectedSeats.forEach((seat) => {
            let row = seat[0].charCodeAt(0) - "A".charCodeAt(0);
            let column = parseInt(seat.slice(1), 10) - 1;

            if (
              newEvent.data.hall.seats[row] &&
              newEvent.data.hall.seats[row][column]
            ) {
              newEvent.data.hall.seats[row][column] = {
                ...newEvent.data.hall.seats[row][column],
                isReserved: true,
              };
            } else {
              console.error(`Invalid seat: ${seat}`);
            }
          });

          try {
            await updateEvent({
              id: newEvent.data._id,
              payload: newEvent.data,
            });
            refetch();
            window.dispatchEvent(new Event("storage"));
            setSelectedSeats([]);
          } catch (error) {
            console.error("Failed to update event:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Login required.",
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      {event && (
        <>
          <h2>Select Your Seats for {event.data.title}</h2>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.vip}`} />
              <span>VIP Zone - {prices.vip}₼</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.gold}`} />
              <span>Gold Zone - {prices.gold}₼</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.silver}`} />
              <span>Silver Zone - {prices.silver}₼</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.standard}`} />
              <span>Standard Zone - {prices.standard}₼</span>
            </div>
          </div>

          <div className={styles.screenContainer}>
            <div className={styles.screen}>SCREEN</div>
          </div>
          <div className={styles.seatMap} style={seatMapStyles}>
            {event.data.hall.seats.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className={styles.rowLabel}>
                  {String.fromCharCode(65 + rowIndex)}
                </div>
                {row.map((seat, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${styles.seat} ${
                      selectedSeats.includes(
                        `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`
                      )
                        ? styles.selected
                        : seat.isReserved
                        ? styles.reserved
                        : seat.type === "vip"
                        ? styles.vip
                        : seat.type === "gold"
                        ? styles.gold
                        : seat.type === "silver"
                        ? styles.silver
                        : ""
                    }`}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                  >
                    <FaChair className={styles.chairIcon} />
                    <span className={styles.seatLabel}>
                      {String.fromCharCode(65 + rowIndex)}
                      {colIndex + 1}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <button onClick={handleConfirmSeats} className={styles.confirmButton}>
            Confirm Seats
          </button>
        </>
      )}
    </div>
  );
};

export default SeatSelection;
