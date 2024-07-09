import React, { useEffect, useState } from "react";
import styles from "../BankCard/bankCard.module.scss";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostOrderMutation } from "../../services/redux/orderApi";
import Swal from "sweetalert2";
import axios from "axios";

const BankCard = () => {
  const location = useLocation();
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState();
  const [postOrders] = usePostOrderMutation();

  useEffect(() => {
    let pendingOrder = localStorage.getItem("pendingOrder");
    setOrder(pendingOrder);
    pendingOrder = JSON.parse(pendingOrder);
    if (pendingOrder?.totalPrice > 0) {
      setTotal(pendingOrder.totalPrice);
    }
  }, []);

  const initialValues = {
    fullName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Ad, soyad required")
      .matches(/^[A-Za-z\s]+$/, "Invalid name"),
    cardNumber: Yup.string()
      .required("Kartın nömrəsi required")
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number"),
    expiryMonth: Yup.string()
      .required("Ay required")
      .matches(/^(0[1-9]|1[0-2])$/, "Invalid month"),
    expiryYear: Yup.string()
      .required("İl required")
      .matches(/^\d{2}$/, "Invalid year"),
    cvv: Yup.string()
      .required("CVV required")
      .matches(/^\d{3}$/, "Invalid CVV"),
  });

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

  const handleSubmit = async (values, actions) => {
    try {
      await postOrders(order);
      var parsed = JSON.parse(order);
      localStorage.removeItem("pendingOrder");
      localStorage.removeItem("orders");
      setTotal(0);
      await sendTicketByMail(parsed.email, "Ordered successfully");
      Swal.fire({
        title: "Order successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error submitting order: ", error);
    }

    actions.resetForm();
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const textColor = location.pathname === "/bank-card" ? "#000000" : "";

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.paymentInfo}>
          <div>
            Ödəniş məbləği: <strong>{total} AZN</strong>
          </div>
          <div>Ödəniş saytı: Epoint - iTicket.AZ</div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={styles.cardForm}>
              <Field
                type="text"
                name="fullName"
                placeholder="AD, SOYAD"
                className={styles.field}
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className={styles.error}
                style={{ color: "red" }}
              />

              <Field
                type="text"
                name="cardNumber"
                placeholder="KARTIN NÖMRƏSİ"
                className={styles.field}
                onChange={(e) => {
                  const formattedCardNumber = formatCardNumber(e.target.value);
                  setFieldValue("cardNumber", formattedCardNumber);
                }}
              />
              <ErrorMessage
                name="cardNumber"
                component="div"
                className={styles.error}
                style={{ color: "red" }}
              />

              <div className={styles.expiryCvv}>
                <Field
                  type="text"
                  name="expiryMonth"
                  placeholder="AY"
                  className={styles.field}
                />
                <ErrorMessage
                  name="expiryMonth"
                  component="div"
                  className={styles.error}
                  style={{ color: "red" }}
                />

                <Field
                  type="text"
                  name="expiryYear"
                  placeholder="İL"
                  className={styles.field}
                />
                <ErrorMessage
                  name="expiryYear"
                  component="div"
                  className={styles.error}
                  style={{ color: "red" }}
                />
                <Field
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  className={styles.field}
                />
                <ErrorMessage
                  name="cvv"
                  component="div"
                  className={styles.error}
                  style={{ color: "red" }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                Təsdiq
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BankCard;
