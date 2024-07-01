import styles from "../Home/home.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../../services/redux/eventApi";
import { Col, Row } from "antd";
import Grid from "@mui/material/Grid";

const Home = () => {
  const { data: events } = useGetEventsQuery();
  console.log(events);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      <section className={styles.sect1}>
        <div className={styles.yellowSect}>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            autoplay={{ delay: 5000 }}
          >
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/5w3xuzhJIM5cGFhEUvmlQZky7z8drtBkSxvZ6UCQ.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/Mp62RHNhbL97NHVYUKztwgm1vurR4HdFYTQKf0nM.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/fUzdF4W2465OsekoaNC8Qq4wEgTEwWjWDPl9atGq.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/gRCtJ3qN0OTlwjTc1uDwDbRw9xKjZSllScm0SMmr.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://cdn.iticket.az/f1/en.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/wfvzcg6LTqX00iCxSLZCARwWmhTHPm7HLvNc5Lqx.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/KIOwz4VFTT7dCCfLQNBzgap4ThLnRpyuhgHJZv0X.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/4xCiihlJnEjwnPgjbPvtiA733a8Dpm5hUbzIPEPk.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className={styles.sect2}>
      <div className="container">
        <h3 className={styles.eventh3}>Popular Events</h3>
        <Grid container spacing={2}>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {events &&
              events.data
                ?.filter((event) => event.categoryName === 'concert')
                .map((event) => (
                  <SwiperSlide className={styles.cards} key={event.id}>
                    <Link
                      to={`/detail/${event._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className={styles.card}>
                        <div className={styles.text}>
                          <h3>{event.createdAt}</h3>
                          <p>{event.location}</p>
                          <h4>{event.title}</h4>
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
                          <span className={styles.price}>{event.price} ₼</span>
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        </Grid>
      </div>
    </section>
      <section className={styles.promotion}>
        <div className="container">
          <a href="">
            <img
              src="https://cdn.iticket.az/images/banners/icard-banner-desktop-03-2023.gif"
              alt=""
            />
          </a>
        </div>
      </section>
      <section className={styles.theatre}>
        <div className="container">
          <h3 className={styles.eventh3}>Theatre</h3>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
          >
            {events &&
              events?.data
                ?.filter((event) => event.categoryName === "theatre")
                .map((event) => (
                  <SwiperSlide className={styles.cards} key={event._id}>
                    <div className={styles.card}>
                      <div className={styles.text}>
                        <h3>{event.createdAt}</h3>
                        <p>{event.title}</p>
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
                        <span className={styles.price}>{event.price}</span>
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </section>

      <section className={styles.promotion2}>
        <div className="container">
          <a href="">
            <img
              src="https://cdn.iticket.az/images/banners/epoint-january-2023-1250x122.gif"
              alt=""
            />
          </a>
        </div>
      </section>
      <section className={styles.kids}>
        <div className="container">
          <h3 className={styles.eventh3}>Kids</h3>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
          >
            {events &&
              events?.data
                ?.filter((event) => event.categoryName === "kids")
                .map((event) => (
                  <SwiperSlide className={styles.cards}>
                    <div className={styles.card}>
                      <div className={styles.text}>
                        <h3>{event.createdAt}</h3>
                        <p>{event.title}</p>
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
                        <span className={styles.price}> {event.price}</span>
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </section>
      <div className="container">
        <section className={styles.app}>
          <div className={styles.content}>
            <h2>FIND YOUR NEXT VISUAL JOURNEY</h2>
            <p>
              The iTicket.AZ application makes it easy and fast to purchase
              tickets for all kinds of events (to
              <br /> the theater, to sport, concerts, exhibitions, etc.).
            </p>
            <div className={styles.links}>
              <a href="" className={styles.imgSrc}>
                <img
                  src="https://iticket.az/images/android.png"
                  alt="Android Download"
                  className={styles.media}
                />
                <hr className={styles.line} />
                <img src="https://iticket.az/images/ios.png" alt="" />
              </a>
              <span></span>
              {/* <a href="">
                    <img
                        src="https://iticket.az/images/ios.png"
                        alt="iOS Download"
                        className={styles.media}
                    />
                </a> */}
            </div>
          </div>
          {/* <div className={styles.download}>
            DOWNLOAD NOW DOWNLOAD NOW DOWNLOAD NOW DOWNLOAD NOW DOWNLOAD NOW
        </div> */}
          <img
            src="https://cdn.iticket.az/images/app.png"
            alt="App Preview"
            className={styles.phone}
          />
        </section>
      </div>
    </>
  );
};

export default Home;
