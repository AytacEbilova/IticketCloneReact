import React, { useEffect, useState } from "react";
import styles from "../Wallet/wallet.module.scss";
import { Col, Row, Button, Select, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneUserQuery } from "../../services/redux/userApi";

const Wallet = () => {
  const navigate=useNavigate();
  const{id}=useParams();
  const {data:user, refetch}=useGetOneUserQuery(id);
  console.log(user)
  const [topUpAmount, setTopUpAmount] = useState(0);
  useEffect(() => {
    const balanceUpdated = localStorage.getItem("balanceUpdated");
    if (balanceUpdated === "true") {
      refetch();
      localStorage.removeItem("balanceUpdated");
    }
  }, [refetch]);

  const handleTopUp = async () => {
    localStorage.setItem("amount",topUpAmount);
    navigate(`/wallet-card/${id}`);
  };
  return (
    <div style={{ padding: "150px 0" }}>
      <div className="container">
        <div className={styles.wallet}>
          <div className={styles.innerWallet}>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={6}>
                <h2>Wallet: {user?.data?.balance} ₼</h2>
                <div className={styles.logoTr}>
                  <img
                    src="https://iticket.az/images/warning.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                  <span style={{ marginBottom: "20px", display: "block" }}>
                    You have no transactions.
                  </span>
                </div>
              </Col>
              <Col className="gutter-row" span={18}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#fd0",
                      color: "black",
                    }}
                    onClick={handleTopUp}
                  >
                    Top up
                  </Button>
                  <Input
                    type="number"
                    defaultValue={0}
                    style={{ width: 60 }}
                    min={0}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
