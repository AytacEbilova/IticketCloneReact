import React, { useEffect, useState } from "react";
import { Select, Col, Row } from "antd";
import axios from "axios";
import styles from "../Concert/concert.module.scss";
import { DatePicker, Space } from "antd";
import { Slider } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const Sport = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceRange, setPriceRange] = useState([4, 2500]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events");
        setEvents(response.data.data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };
  const handlePriceChange = (value) => {
    setPriceRange(value);
    filterEvents(value);
  };

  const filterEvents = (priceRange) => {
    const filtered = events.filter(
      (event) => event.price >= priceRange[0] && event.price <= priceRange[1]
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className={styles.concerts}>
      <div className="container">
        <h2 className={styles.eventh2}>All Events</h2>
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
              options={[
                {
                  value: "Heydar Aliyev Palace",
                  label: "Heydar Aliyev Palace",
                },
                {
                  value: "National Gymnastics Arena",
                  label: "National Gymnastics Arena",
                },
                {
                  value: "International Mugham Center",
                  label: "International Mugham Center",
                },
                { value: "Hayal Kahvesi", label: "Hayal Kahvesi" },
              ]}
            />
          </Col>
          <Col className="gutter-row" span={8} xs={24} sm={24} md={12} lg={8}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <DatePicker
                onChange={onChange}
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
          {events
           ?.filter((event) => event.categoryName === "sport")
            .filter(
              (event) =>
                !selectedLocation || event.location === selectedLocation
            )
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
                    <span className={styles.price}> {event.price}</span>
                  </span>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Sport;
