import React from "react";
import { Select } from "antd";
import { useGetEventsQuery } from "../../services/redux/eventApi";
import { Col, Divider, Row } from "antd";
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
const Concert = () => {
  const { data: events } = useGetEventsQuery();
  console.log(events)
  return (
    <div>
      <h2 style={{ padding: "100px" }}>Concert</h2>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />
      <div className="container">
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {events?.data?.filter(event=>event.categoryName==="concert").map(event=>(
            <Col className="gutter-row" span={8} xs={24} sm={24} md={12} lg={8}>
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
                <span className={styles.price}> {event.price}</span>
              </span>
          </Col>
          ))}
          
        </Row>
      </div>
    </div>
  );
};

export default Concert;
