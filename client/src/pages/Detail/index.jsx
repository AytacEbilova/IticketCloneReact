import React, { useContext, useState } from "react";
import {
  useGetEventsQuery,
  useGetOneEventQuery,
} from "../../services/redux/eventApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../Detail/detail.module.scss";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import { Button } from "antd";
import { Col, Row } from "antd";
import { FaHeart } from "react-icons/fa";
import Grid from "@mui/material/Grid";
import { WishlistContext } from "../../context/favoriteContext";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const { data: event } = useGetOneEventQuery(id);
  const { data: events } = useGetEventsQuery();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const handleGetTickets = () => {
    navigate(`/select-seats/${id}`);
  };

  const handleWishlist = (event) => {
    const isInWishlist = wishlist.some((item) => item._id === event.data._id);
    if (isInWishlist) {
      removeFromWishlist(event.data._id);
    } else {
      addToWishlist(event.data);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {event && (
        <>
          <section className={styles.sect1}>
            <div className={styles.imgCont}>
              <img src={event.data.detailImg} alt="" className={styles.img1} />
            </div>
            <div className={styles.info}>
              <div className="container">
                <p className={styles.bn}>
                  from
                  <span className={styles.price}>{event.data.price}₼</span>
                </p>

                <div className={styles.btn}>
                  <Button
                    className={styles.buttonn}
                    onClick={() => handleWishlist(event)}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid black",
                    }}
                  >
                    <FaHeart
                      className={styles.icon}
                      style={{
                        color: wishlist.some(
                          (item) => item._id === event.data._id
                        )
                          ? "red"
                          : "inherit",
                      }}
                    />
                  </Button>
                  <Button className={styles.buttonn}>
                    <PiShareFat className={styles.icon} />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <section className={styles.sect2}>
        <div className="container">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={6} xs={24} sm={24} md={12} lg={6}>
              <a href="">
                <div className={styles.infoBlock}>
                  <div className={styles.allSpan}>
                    <span className={styles.span1}>
                      <img src="https://iticket.az/images/venue.svg" alt="" />
                    </span>
                    <span className={styles.span2}>
                      <img src="https://iticket.az/images/date.svg" alt="" />
                    </span>
                  </div>
                  <div className={styles.text}>
                    <span>Venue</span>
                    <span>Date</span>
                  </div>
                </div>
              </a>
            </Col>
            <Col className="gutter-row" span={6} xs={24} sm={24} md={12} lg={6}>
              <a href="">
                <div className={styles.infoBlock}>
                  <div className={styles.allSpan}>
                    <span className={styles.span1}>
                      <img src="https://iticket.az/images/age.svg" alt="" />
                      <span className={styles.age}>6+</span>
                    </span>
                    <span className={styles.span2}>
                      <img src="https://iticket.az/images/locale.svg" alt="" />
                    </span>
                  </div>
                  <div className={styles.text}>
                    <span>Language</span>
                    <span>Age Restriction</span>
                  </div>
                </div>
              </a>
            </Col>
            <Col className="gutter-row" span={6} xs={24} sm={24} md={12} lg={6}>
              <a href="">
                <div className={styles.infoBlock}>
                  <div className={styles.allSpan}>
                    <span className={styles.span1}>
                      <img
                        src="https://iticket.az/images/currency.svg"
                        alt=""
                      />
                    </span>
                    <span className={styles.span2}>
                      <img src="https://iticket.az/images/tickets.svg" alt="" />
                    </span>
                  </div>
                  <div className={styles.text}>
                    <span>Price</span>
                    <span>Ticket info</span>
                  </div>
                </div>
              </a>
            </Col>
            <Col className="gutter-row" span={6} xs={24} sm={24} md={12} lg={6}>
              <a href="">
                <div className={styles.infoBlock}>
                  <div className={styles.allSpan}>
                    <span className={styles.span2}>
                      <img src="https://iticket.az/images/info.svg" alt="" />
                    </span>
                  </div>
                  <div className={styles.text}>
                    <span>About Event</span>
                  </div>
                </div>
              </a>
            </Col>
          </Row>
        </div>
      </section>
      <section className={styles.sect6} id={styles.getTicketSect6}>
        <div className="container">
          <div className={styles.eventItems}>
            {event && (
              <div key={event._id} className={styles.eventItem}>
                <div className={styles.eventDetails}>
                  <div className={styles.eventTitle}>
                    {event.data.title}(Language: {event.data.language})
                  </div>
                  <div className={styles.eventLocation}>
                    {event.data.hall.name}
                  </div>
                </div>
                <div className={styles.eventDate}>
                  <p>Date</p>
                  <p>{event.data.createdAt}</p>
                </div>
                <div className={styles.eventPrice}>
                  <p>Price</p>
                  <p>{event.data.price} ₼</p>
                </div>
                <button
                  className={styles.getTicketsButton}
                  onClick={handleGetTickets}
                >
                  Get tickets
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className={styles.sect3}>
        <div className="container">
          <Grid container spacing={2}>
            {event && (
              <>
                <Grid item xs={12} md={6} lg={7} sm={12}>
                  <div className={styles.tabList}>
                    <div className={styles.tabHeader}>
                      <div
                        className={`${styles.tab1} ${
                          activeTab === "about" ? styles.active : ""
                        }`}
                        onClick={() => handleTabClick("about")}
                      >
                        <button type="button">
                          <h3 className={styles.tabH2}>About event</h3>
                        </button>
                      </div>
                      <div
                        className={`${styles.tab1} ${
                          activeTab === "language" ? styles.active : ""
                        }`}
                        onClick={() => handleTabClick("language")}
                      >
                        <button type="button">
                          <h3 className={styles.tabH2}>
                            Age restriction/Language
                          </h3>
                        </button>
                      </div>
                    </div>
                    <div className={styles.tabBody}>
                      <div className={styles.tabTitle}>
                        <p>
                          {activeTab === "about"
                            ? event.data.description
                            : event.data.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={5} sm={12}>
                  <div className={styles.imgCont}>
                    <img
                      src={event.data.mainImg}
                      alt=""
                      className={styles.img1}
                    />
                    <img
                      src={event.data.secondImg}
                      alt=""
                      className={styles.img2}
                    />
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </section>

      <div className="container">
        <hr style={{ backgroundColor: "#e9ecf2" }} />
      </div>

      <section className={styles.sect5}>
        <div className="container">
          <h2>Venue location</h2>
          <Grid container spacing={2}>
            {event && (
              <>
                <Grid item xs={12} md={6} lg={7} sm={12}>
                  <div className={styles.map}>
                    <iframe
                      src="https://maps.google.com/maps?q=40.3778158,49.8412733&z=16&output=embed"
                      frameborder="0"
                      className={styles.frame}
                    ></iframe>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={5} sm={12} className={styles.all}>
                  <div className={styles.venueCard}>
                    <div>
                      <h3>{event.data.hall.name}</h3>
                      <p>{event.data.hall.location}</p>

                      <h3>Phone</h3>
                      <a href="tel:(+994 12) 493 55 11">(+994 12) 493 55 11</a>
                      <h3>Mobile</h3>
                      <a href="tel:+994 50 493 55 11"> +994 50 493 55 11</a>
                      <div className={styles.btn}>
                        <a href="http://maps.google.com/maps?q=40.3778158,49.8412733">
                          <button>Get Direction</button>
                        </a>
                      </div>
                      <p></p>
                    </div>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </section>

      <div className="container">
        <hr style={{ backgroundColor: "#E4E7EB" }} />
      </div>
      <section className={styles.sect4}>
        <div className="container">
          <h2 className={styles.eventh2}>Similar Events</h2>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            {events?.data
              .filter((event) => event.categoryName === "concert")
              .map((event) => (
                <Col
                  key={event._id}
                  className="gutter-row"
                  span={8}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                >
                  <Link to={`/detail/${event._id}`}>
                    <div className={styles.card}>
                      <div className={styles.text}>
                        <h3>{event.createdAt}</h3>
                        <p>
                          {event.location} • <span>{event.title}</span>
                        </p>
                      </div>
                      <div className={styles.imgCont}>
                        <img
                          src={event.mainImg}
                          alt=""
                          className={styles.img1}
                        />
                        <img
                          src={event.secondImg}
                          alt=""
                          className={styles.img2}
                        />
                      </div>
                      <span className={styles.bn}>
                        from
                        <span className={styles.price}> {event.price} ₼</span>
                      </span>
                    </div>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Detail;
