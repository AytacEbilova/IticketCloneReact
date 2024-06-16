import styles from "../Home/home.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as React from "react";

const Home = () => {
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
                src="https://cdn.iticket.az/event/slide/ezGhF67gqCnIvAl6Jgec8SRpzZngDEh6OiFprqtC.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/EmxE42GQnpRxoevGoiTWlcGeyhGuJNPvNQWffzes.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.iticket.az/event/slide/V0ZjM1D2JkLsjdzNpgrVWTlCOcMcp5zumcn8WgA4.jpg"
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
                src="https://cdn.iticket.az/event/slide/y1L7DEghKaiunrRZRZ54L0UE7mzVPgBILae7PhVG.jpg"
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
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Instasamka & Moneyken (EGP Arena )</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/b7TUv3Mt3y3TgycUACDKh7Ky5MCZWkN7tDNvImgF.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 20 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Instasamka & Moneyken (EGP Arena)</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/hF1nxy92rtGePAlH7kNPo8fA4w1xbwuyZYDekBK9.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Instasamka & Moneyken (EGP Arena)</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/waJkxaQODmz4fGS8qPYNsM8DrYSYZwliuVwgaslo.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Instasamka & Moneyken (EGP Arena)</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/7wXvdsRP1P4Obb1Lr2psnWZfubSv8QNctTAc8dSk.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
          </Swiper>
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
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>21 June 2024</h3>
                  <p>Do not go without saying goodbye</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/d4gyaCv3hzl37RVnBYmqQ9CpvvfmcXYlXtWsewgD.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 20 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Войцек</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster/p67XpyJukm1I9a4oD3VTu1k2thl2EXlfSRu792Yf.png"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Instinct</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/HG1P891QwLb7RWpjUD1SP6mc5kUoBAbRtiDLAoJs.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Войцек</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/jIIDTvedg1i3a8hgT8VOhNOLE3AhrR71eyjjQf0G.jpg"
                    alt=""
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
          </Swiper>
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
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>21 June 2024</h3>
                  <p>Time of Miracles</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/VmtWHbkPzm127SLg0l5GfMvhIljQ2u7tG5bCPQKy.jpg"
                    alt=""
                    className={styles.img1}
                  />
                  <img
                    src="https://cdn.iticket.az/event/poster/ESpT0lZzufT8QDd4MhpmArPaQs1unRN6RiEj04uy.png"
                    alt=""
                    className={styles.img2}
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 20 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Войцек</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/ElZvgVT94eHGY2ulctQwoiGNGEPVXFf5pM43iHqM.jpg"
                    alt=""
                    className={styles.img1}
                  />
                  <img
                    src="https://cdn.iticket.az/event/poster/ouf5tEl4vt4zqJxen9GwA4KaJ4GyRsy9lt10w1RW.png"
                    alt=""
                    className={styles.img2}
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Instinct</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/Y4Yn6EiwwHcQbmX9g0Jl6VGyR4fI7j3vXSMjUi4K.jpg"
                    alt=""
                    className={styles.img1}
                  />
                  <img
                    src="https://cdn.iticket.az/event/poster/VIhH7NhYBZDn3FmMJOOczAwg0C1LlWTIjmA0yHAH.png"
                    alt=""
                    className={styles.img2}
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.text}>
                  <h3>16 June 2024</h3>
                  <p>Войцек</p>
                </div>
                <div className={styles.imgCont}>
                  <img
                    src="https://cdn.iticket.az/event/poster_bg/UJeq9yFo8iNnehyOhiFsiuzrkxKc02gbp6h79RQF.jpg"
                    alt=""
                    className={styles.img1}
                  />
                  <img
                    src="https://cdn.iticket.az/event/poster/fcoI1bya3Q2D3u0Nv2AVE9wIDfGopZSS9zwdes9O.png"
                    alt=""
                    className={styles.img2}
                  />
                </div>
                <span className={styles.bn}>
                  from
                  <span className={styles.price}> 30 ₼</span>
                </span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <div className="container">
  <section className={styles.app}>
    <div className={styles.content}>
      <h2>FIND YOUR NEXT VISUAL JOURNEY</h2>
      <p>
        The iTicket.AZ application makes it easy and fast to purchase tickets for all kinds of events (to
        <br /> the theater, to sport, concerts, exhibitions, etc.).
      </p>
      <div className={styles.links}>
        <a href="">
          <img src="https://iticket.az/images/android.png" alt="Android Download" className= {styles.media} />
        </a>
        <span></span>
        <a href="">
          <img src="https://iticket.az/images/ios.png" alt="iOS Download"className= {styles.media} />
        </a>
      </div>
    </div>
    {/* <div className={styles["download-wrapper"]}>
      <div className={styles.download}>
        DOWNLOAD NOW DOWNLOAD NOW DOWNLOAD NOW DOWNLOAD NOW DOWNLOAD NOW 
      </div>
    </div> */}
    <img src="https://cdn.iticket.az/images/app.png" alt="App Preview" className={styles.phone} />
  </section>
</div>


    </>
  );
};

export default Home;
