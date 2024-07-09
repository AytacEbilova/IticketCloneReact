import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import styles from "../UpdatePas/update.module.scss";
import { useGetOneUserQuery, useUpdateUserMutation } from "../../services/redux/userApi";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const { data: user } = useGetOneUserQuery(id);
  const [updateUserPass] = useUpdateUserMutation();

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (currentUser.password === values.currentPassword) {
          let updatedUser = { ...user, password: values.newPassword };

          await updateUserPass({ id: currentUser._id, payload: updatedUser });
          localStorage.setItem("user", JSON.stringify(updatedUser));
          Swal.fire({
            title: "Update successfully!",
            text: "Password has been updated",
            icon: "success",
          });
          actions.resetForm();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Current Password is wrong",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error submitting event: ", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the password",
          icon: "error",
        });
      }
    },
  });

  return (
    <section className={styles.section}>
      <Container maxWidth="lg" className={styles.update}>
        <Typography component="h1" variant="h5" gutterBottom>
          Update Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.all}>
            <div className={styles.inp}>
              <TextField
                variant="outlined"
                label="Current Password"
                type="password"
                name="currentPassword"
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
                className={styles.text}
              />
            </div>
            <div className={styles.inp}>
              <TextField
                variant="outlined"
                label="New Password"
                type="password"
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                className={styles.text}
              />
            </div>
            <div className={styles.inp}>
              <TextField
                variant="outlined"
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                className={styles.text}
              />
            </div>
          </div>
          <Button
            variant="contained"
            type="submit"
            className={styles.btn}
          >
            Save Changes
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default UpdatePassword;
