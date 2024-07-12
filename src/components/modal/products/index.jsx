import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { category } from "@service";
import productsApi from "../../../service/products";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object().shape({
  age_max: Yup.number()
    .required("Age Maximum is required")
    .min(0, "Age Maximum must be a positive number"),
  age_min: Yup.number()
    .required("Age Minimum is required")
    .min(0, "Age Minimum must be a positive number"),
  category_id: Yup.string().required("Category is required"),
  color: Yup.array()
    .of(Yup.string().required("Color is required"))
    .min(1, "At least one color is required"),
  cost: Yup.number()
    .required("Cost is required")
    .min(0, "Cost must be a positive number"),
  count: Yup.number()
    .required("Count is required")
    .min(0, "Count must be a positive number"),
  description: Yup.string().required("Description is required"),
  discount: Yup.number()
    .required("Discount is required")
    .min(0, "Discount must be a positive number"),
  for_gender: Yup.string().required("Gender is required"),
  made_in: Yup.string().required("Made In is required"),
  product_name: Yup.string().required("Product Name is required"),
  size: Yup.array()
    .of(Yup.string().required("Size is required"))
    .min(1, "At least one size is required"),
});

const ProductForm = ({ open, handleClose, item }) => {
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState({
    limit: 15,
    page: 1,
  });

  const getDataCategory = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200 && response?.data?.categories) {
        setProducts(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataCategory();
  }, [params]);

  const initialValues = {
    age_max: item?.age_max ?? "",
    age_min: item?.age_min ?? "",
    category_id: item?.category_id ?? "",
    color: item?.color ?? [],
    cost: item?.cost ?? "",
    count: item?.count ?? "",
    description: item?.description ?? "",
    discount: item?.discount ?? "",
    for_gender: item?.for_gender ?? "",
    made_in: item?.made_in ?? "",
    product_name: item?.product_name ?? "",
    size: item?.size ?? [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await productsApi.create(values);
      if (response.status === 201) {
        toast.success("Product added successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to add product!");
      }
    } catch (error) {
      console.error("Error while adding product:", error);
      toast.error("Failed to add product!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            className="text-center pb-3"
            variant="h6"
            component="h2"
          >
            {item ? "Edit Product" : "Add Product"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Age Maximum"
                      name="age_max"
                      onChange={handleChange}
                      value={values.age_max}
                      type="number"
                      error={touched.age_max && Boolean(errors.age_max)}
                      helperText={touched.age_max && errors.age_max}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Count"
                      name="count"
                      onChange={handleChange}
                      value={values.count}
                      type="number"
                      error={touched.count && Boolean(errors.count)}
                      helperText={touched.count && errors.count}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Age Minimum"
                      name="age_min"
                      onChange={handleChange}
                      value={values.age_min}
                      type="number"
                      error={touched.age_min && Boolean(errors.age_min)}
                      helperText={touched.age_min && errors.age_min}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Discount"
                      name="discount"
                      onChange={handleChange}
                      value={values.discount}
                      type="number"
                      error={touched.discount && Boolean(errors.discount)}
                      helperText={touched.discount && errors.discount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        name="category_id"
                        value={values.category_id}
                        onChange={handleChange}
                        error={
                          touched.category_id && Boolean(errors.category_id)
                        }
                      >
                        {products.map((item) => (
                          <MenuItem
                            key={item.category_id}
                            value={item.category_id}
                          >
                            {item.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.category_id && errors.category_id && (
                        <Typography color="error" variant="body2">
                          {errors.category_id}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="made-in-label">Made In</InputLabel>
                      <Select
                        labelId="made-in-label"
                        name="made_in"
                        value={values.made_in}
                        onChange={handleChange}
                        error={touched.made_in && Boolean(errors.made_in)}
                      >
                        <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                        <MenuItem value="Turkey">Turkey</MenuItem>
                        <MenuItem value="China">China</MenuItem>
                      </Select>
                      {touched.made_in && errors.made_in && (
                        <Typography color="error" variant="body2">
                          {errors.made_in}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Color"
                      name="color"
                      onChange={(e) => setFieldValue("color", [e.target.value])}
                      value={values.color}
                      error={touched.color && Boolean(errors.color)}
                      helperText={touched.color && errors.color}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Size"
                      name="size"
                      onChange={(e) => setFieldValue("size", [e.target.value])}
                      value={values.size}
                      error={touched.size && Boolean(errors.size)}
                      helperText={touched.size && errors.size}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      label="Cost"
                      name="cost"
                      onChange={handleChange}
                      value={values.cost}
                      type="number"
                      error={touched.cost && Boolean(errors.cost)}
                      helperText={touched.cost && errors.cost}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        row
                        name="for_gender"
                        value={values.for_gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                      {touched.for_gender && errors.for_gender && (
                        <Typography color="error" variant="body2">
                          {errors.for_gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                 
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="product_name"
                      onChange={handleChange}
                      value={values.product_name}
                      error={
                        touched.product_name && Boolean(errors.product_name)
                      }
                      helperText={touched.product_name && errors.product_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      multiline
                      rows={2}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, textAlign: "right" }}>
                  <Button
                    onClick={handleClose}
                    sx={{
                      mr: 2,
                      backgroundColor: "#FFFFFF", // White background
                      color: "#000000", // Black text color
                      border: "1px solid #000000", // Black border
                      '&:hover': {
                        backgroundColor: "#F0F0F0", // Light grey on hover
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#40E0D0", // Turquoise background
                      color: "#FFFFFF", // White text color
                      '&:hover': {
                        backgroundColor: "#36CFC9", // Darker turquoise on hover
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    {item ? "Update" : "Submit"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ProductForm;
