import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";
import FormInput from "../muiComponent/FormInput";
import axios from "axios";

function Student_Form({itemId}) {
  const initialValues = {
    name: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    phoneNum: "",
  };

  //  console.log("itemId>>>>", itemId ? itemId : "nothing");
  const [formData, setFormData] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (itemId) {
      console.log("itemId>>>>", itemId ? itemId : "nothing");
      // Fetch data if itemId is provided (edit mode)
      setIsEdit(true);
      fetchData(itemId);
    } else {
      setIsEdit(false);
    }
  }, [itemId]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/${id}`
      );
      console.log("Record edited:", response);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        // Handle edit logic, make a PUT request
        const response = await axios.put(
          `http://localhost:5000/api/student/${itemId}`,
          formData
        );
        console.log("Record edited:", response.data);
        setFormData(initialValues);
      } else {
        const res = await axios
          .post("http://localhost:5000/api/student", formData)
          .then((res) => {
            console.log("crete");
            setFormData(initialValues);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container fixed>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormInput
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormInput
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormInput
                fullWidth
                // label="Date of Birth"
                name="dateOfBirth"
                type="date"
                variant="outlined"
                // value={formatToYYYYMMDD(formData.dateOfBirth)}
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormInput
                fullWidth
                label="Gender"
                name="gender"
                variant="outlined"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormInput
                fullWidth
                label="Phone"
                name="phoneNum"
                variant="outlined"
                value={formData.phoneNum}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" variant="contained" color="primary">
                {isEdit ? "Edit" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Student_Form;
