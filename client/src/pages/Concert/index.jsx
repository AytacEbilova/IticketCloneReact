import React, { useEffect, useState } from "react";
import { Select, Col, Row, DatePicker, Space, Slider } from "antd";

import styles from "../Concert/concert.module.scss";

import { useGetEventsQuery } from "../../services/redux/eventApi";
import { useGetHallsQuery } from "../../services/redux/hallApi";
import { Link } from "react-router-dom";

const Concert = () => {

  const{data:events}=useGetEventsQuery();
  const {data:halls}=useGetHallsQuery();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priceRange, setPriceRange] = useState([4, 2500]);

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    filterEvents(value);
  };

  const filterEvents = () => {
    const filtered = events?.data
      .filter((event) => event.categoryName === "concert")
      .filter(
        (event) =>
          !selectedLocation || event.hall.name === selectedLocation
      )
      .filter((event) => {
        if (selectedDate) {
          const eventDate = new Date(event.createdAt);
          const selectedDateObj = new Date(selectedDate);
          return eventDate.getFullYear() === selectedDateObj.getFullYear() &&
                 eventDate.getMonth() === selectedDateObj.getMonth() &&
                 eventDate.getDate() === selectedDateObj.getDate();
  
        }
        return true; 
      })
      .filter(
        (event) => event.price >= priceRange[0] && event.price <= priceRange[1]
      );
    setFilteredEvents(filtered);
  };


console.log(filteredEvents)
  useEffect(() => {
    filterEvents();
  }, [events, selectedLocation, selectedDate, priceRange]);

  return (
    <div className={styles.concerts}>
       <div className={styles.whiteheader}
      style={{height:"140px",backgroundColor:"white", width:"100%"}}>

      </div>
      <div className="container">
        <h2 className={styles.eventh2}>Concert</h2>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" span={8} xs={24} sm={24} md={12} lg={8}>
          <Select
              showSearch
              placeholder="Choose venue"
              optionFilterProp="label"
              onChange={handleLocationChange}
              style={{ width: "100%" }}
              options={halls?.data?.map((hall) => ({
                value: hall.name,
                label: hall.name,
              }))}
            />
          </Col>
          <Col className="gutter-row" span={8} xs={24} sm={24} md={12} lg={8}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <DatePicker
                onChange={handleDateChange}
                style={{
                  width: "100%",
                }}
              />
            </Space>
          </Col>
          <Col className="gutter-row" span={8} xs={24} sm={24} md={12} lg={8}>
            <div style={{ border: "1px solid #d9d9d9", padding: "10px" }}>
              <Slider
                range
                defaultValue={[4, 2500]}
                min={4}
                max={2500}
                onChange={handlePriceChange}
              />
              <div>
                Price from {priceRange[0].toFixed(2)} ₼ to{" "}
                {priceRange[1].toFixed(2)} ₼
              </div>
            </div>
          </Col>
        </Row>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {filteredEvents?.map((event) => (
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
                  <img src={event.mainImg} alt="" className={styles.img1} />
                  <img src={event.secondImg} alt="" className={styles.img2} />
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
    </div>
  );
};

export default Concert;
