import React from "react";
import styles from "../GiftCard/giftCard.module.scss";
import { useGetCouponQuery } from "../../services/redux/couponApi";
const GiftCard = () => {
  const { data: coupons } = useGetCouponQuery();
  console.log(coupons)
  return (
    <div className={styles.giftSect}>
      {coupons && coupons.data.map((coupon)=>(
      <div className={styles.giftCard}>
        <div className="container">
          <div className={styles.giftImg}>
            <img src="https://iticket.az/images/gift-card.png" alt="" />
          </div>
          <h2 className={styles.giftWord}>{coupon.name}</h2>
          <p className={styles.giftP}>Expire Date:{coupon.expireDate}</p>
          <p className={styles.giftPersonLimit}>
            Usage Limit:{coupon.limit}
          </p>
        </div>
      </div>

      ))}
    </div>
  );
};

export default GiftCard; 