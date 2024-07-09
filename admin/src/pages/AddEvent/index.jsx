import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import eventSchema from "../../validation/event.validation";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  useGetEventsQuery,
  usePostEventsMutation,
} from "../../service/eventApi";
import { useGetHallsQuery } from "../../service/hallApi";

const AddEvent = () => {
  const [selectedHall, setSelectedHall] = useState("");
  const [postEvent] = usePostEventsMutation();
  const { refetch } = useGetEventsQuery();
  const { data: halls } = useGetHallsQuery();

  const formik = useFormik({
    initialValues: {
      title: "",
      mainImg: "",
      secondImg: "",
      price: "",
      description: "",
      sellCount: "",
      remainCount: "",
      basketCount: "",
      createdAt: "",
      categoryName: "",
      language: "",
      hall: null,
      detailImg: "",
    },
    validationSchema: eventSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting values: ", values);
      try {
        if (selectedHall) {
          values.hall = selectedHall;
        }
        values.remainCount = selectedHall.seats.reduce(
          (total, row) => total + row.length,
          0
        );
        const response = await postEvent(values);
        console.log("Response: ", response);

        Swal.fire({
          title: "Added successfully!",
          text: "You clicked the button!",
          icon: "success",
        });

        actions.resetForm();
        setSelectedHall(""); 
        refetch();
      } catch (error) {
        console.error("Error submitting event: ", error);
      }
    },
  });

  return (
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
        Add New Event
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
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="title"
          id="title"
          type="text"
          label="Event Title"
          variant="outlined"
          fullWidth
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          value={formik.values.mainImg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="mainImg"
          id="mainImg"
          type="text"
          label="Main Image URL"
          variant="outlined"
          fullWidth
          error={formik.touched.mainImg && Boolean(formik.errors.mainImg)}
          helperText={formik.touched.mainImg && formik.errors.mainImg}
        />
        <TextField
          value={formik.values.secondImg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="secondImg"
          id="secondImg"
          type="text"
          label="Second Image URL"
          variant="outlined"
          fullWidth
          error={formik.touched.secondImg && Boolean(formik.errors.secondImg)}
          helperText={formik.touched.secondImg && formik.errors.secondImg}
        />
        <TextField
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="price"
          id="price"
          type="number"
          label="Price"
          variant="outlined"
          fullWidth
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="description"
          id="description"
          type="text"
          label="Description"
          variant="outlined"
          fullWidth
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          value={formik.values.sellCount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="sellCount"
          id="sellCount"
          type="number"
          label="Sell Count"
          variant="outlined"
          fullWidth
          error={formik.touched.sellCount && Boolean(formik.errors.sellCount)}
          helperText={formik.touched.sellCount && formik.errors.sellCount}
        />

        <TextField
          value={formik.values.basketCount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="basketCount"
          id="basketCount"
          type="number"
          label="Basket Count"
          variant="outlined"
          fullWidth
          error={
            formik.touched.basketCount && Boolean(formik.errors.basketCount)
          }
          helperText={formik.touched.basketCount && formik.errors.basketCount}
        />
        <TextField
          value={formik.values.createdAt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="createdAt"
          id="createdAt"
          type="text"
          label="Created At"
          variant="outlined"
          fullWidth
          error={formik.touched.createdAt && Boolean(formik.errors.createdAt)}
          helperText={formik.touched.createdAt && formik.errors.createdAt}
        />
        <TextField
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="categoryName"
          id="categoryName"
          type="text"
          label="Category Name"
          variant="outlined"
          fullWidth
          error={
            formik.touched.categoryName && Boolean(formik.errors.categoryName)
          }
          helperText={formik.touched.categoryName && formik.errors.categoryName}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="hall-label">Hall</InputLabel>
          <Select
            labelId="hall-label"
            id="hall"
            value={selectedHall}
            onChange={(e) => setSelectedHall(e.target.value)}
            label="Hall"
          >
            {halls?.data &&
              halls.data.map((hall) => (
                <MenuItem key={hall._id} value={hall}>
                  {hall.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          value={formik.values.language}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="language"
          id="language"
          type="text"
          label="Language"
          variant="outlined"
          fullWidth
          error={formik.touched.language && Boolean(formik.errors.language)}
          helperText={formik.touched.language && formik.errors.language}
        />
        <TextField
          value={formik.values.detailImg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="detailImg"
          id="detailImg"
          type="text"
          label="Detail Image URL"
          variant="outlined"
          fullWidth
          error={formik.touched.detailImg && Boolean(formik.errors.detailImg)}
          helperText={formik.touched.detailImg && formik.errors.detailImg}
        />
        <Button variant="contained" type="submit" color="primary" size="large">
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEvent;
