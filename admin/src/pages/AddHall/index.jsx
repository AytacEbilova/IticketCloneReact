import React from "react";
import { usePostHallsMutation } from "../../service/hallApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import Swal from "sweetalert2";

const AddHall = () => {
  const [addHall, { isLoading, isSuccess, isError, error }] = usePostHallsMutation();

  const formik = useFormik({
    initialValues: {
      location: "",
      name: "",
      contactPhone: "",
      email: "",
      rows: "",
      cols: "",
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Location is required"),
      name: Yup.string().required("Name is required"),
      contactPhone: Yup.string()
      .matches(/^\+994 \d{2} \d{3} \d{2} \d{2}$/, 'Contact phone must be in the format +994 XX XXX XX XX')
      .required('Contact phone is required'),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      rows: Yup.number()
        .positive("Rows must be a positive number")
        .integer("Rows must be an integer")
        .required("Rows are required"),
      cols: Yup.number()
        .positive("Columns must be a positive number")
        .integer("Columns must be an integer")
        .required("Columns are required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const response = await addHall({
          location: values.location,
          name: values.name,
          contactPhone: values.contactPhone,
          email: values.email,
          rows: parseInt(values.rows, 10),
          cols: parseInt(values.cols, 10)
        });
        console.log("Response: ", response);

        Swal.fire({
          title: "Added successfully!",
          text: "You clicked the button!",
          icon: "success",
        });

        actions.resetForm();
      } catch (error) {
        console.error("Error submitting event: ", error);
      }
    },
  });

  return (
    <div>
      <h2>Add New Hall</h2>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          margin: "50px auto",
          width: "800px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Hall
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <TextField
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="location"
            id="location"
            type="text"
            label="Location"
            variant="outlined"
            fullWidth
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <TextField
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            id="name"
            type="text"
            label="Name"
            variant="outlined"
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            value={formik.values.contactPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="contactPhone"
            id="contactPhone"
            type="text"
            label="Contact Phone"
            variant="outlined"
            fullWidth
            error={formik.touched.contactPhone && Boolean(formik.errors.contactPhone)}
            helperText={formik.touched.contactPhone && formik.errors.contactPhone}
          />
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            value={formik.values.rows}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rows"
            id="rows"
            type="number"
            label="Rows"
            variant="outlined"
            fullWidth
            error={formik.touched.rows && Boolean(formik.errors.rows)}
            helperText={formik.touched.rows && formik.errors.rows}
          />
          <TextField
            value={formik.values.cols}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="cols"
            id="cols"
            type="number"
            label="Columns"
            variant="outlined"
            fullWidth
            error={formik.touched.cols && Boolean(formik.errors.cols)}
            helperText={formik.touched.cols && formik.errors.cols}
          />
          <Button variant="contained" type="submit" color="primary" size="large" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Hall'}
          </Button>
        </form>
      </Box>
      {isSuccess && <p style={{ color: "green" }}>Hall added successfully!</p>}
      {isError && <p style={{ color: "red" }}>{error?.data || "Failed to add hall"}</p>}
    </div>
  );
};

export default AddHall;
