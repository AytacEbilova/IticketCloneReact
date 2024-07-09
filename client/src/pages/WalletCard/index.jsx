import React from 'react';
import styles from '../BankCard/bankCard.module.scss';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGetOneUserQuery, useGetUsersQuery, useUpdateUserMutation } from '../../services/redux/userApi';
import { useNavigate, useParams } from 'react-router-dom';

const WalletCard = () => {
  const navigate=useNavigate();

  const {data:users}=useGetUsersQuery();
  const{id}=useParams();
  const {data:user}=useGetOneUserQuery(id);
  console.log(user)
  const[updateUser]=useUpdateUserMutation();
  const amount = localStorage.getItem("amount");
  
  const initialValues = {
    fullName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  };

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

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  

  const handleSubmit = async (values, actions) => {
    console.log("Form data", values);
    const newUser = { ...user.data };
    newUser.balance += parseInt(amount);
    console.log("new user : ", newUser);
    await updateUser({ id: user.data._id, payload: newUser });
    alert("updated");
    localStorage.removeItem("amount");
    localStorage.setItem("balanceUpdated", "true"); // Set flag here
    navigate(`/wallet/${user.data._id}`);
    actions.resetForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.paymentInfo}>
          <div>
            Ödəniş məbləği: <strong>{amount} AZN</strong>
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

export default WalletCard;
