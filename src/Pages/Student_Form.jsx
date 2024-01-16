import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import FormInput from "../muiComponent/FormInput";
import axios from "axios";

function Student_Form({ editID, setFormSubmitted }) {
  const initialValues = {
    name: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    phoneNum: "",
  };

  console.log("editID>>>>", editID ? editID : "nothing");
  const [formData, setFormData] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateOfBirth: date,
    });
  };

  useEffect(() => {
    if (editID) {
      console.log("editID>>>>", editID ? editID : "nothing");
      // Fetch data if editID is provided (edit mode)
      setIsEdit(true);
      fetchData(editID);
    } else {
      setIsEdit(false);
    }
  }, [editID]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/${id}`
      );
      console.log("Record edited:", response.data);
      const date = new Date(response.data.dateOfBirth);
      const formattedDate = date.toLocaleDateString("en-US");
      const newData = { ...response.data, dateOfBirth: formattedDate };
      console.log("newData >>>>>", newData);
      setFormData(newData);
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
          `http://localhost:5000/api/student/${editID}`,
          formData
        );
        console.log("Record edited:", response.data);
        setFormData(initialValues);
        setIsEdit(false);
      } else {
        const res = await axios
          .post("http://localhost:5000/api/student", formData)
          .then((res) => {
            console.log("crete");
            setFormData(initialValues);
          })
          .then((error) => {
            console.error("Error:", error);
          });
      }

      setFormSubmitted((prev) => prev + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  console.log(">>>>>formData >>>>>", formData);
  const today = new Date().toISOString().split("T")[0];
  return (
    <Container fixed>
      <Box p={2} width={1000} bgcolor="#f0f0f0" margin="auto">
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
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                row
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
            </Grid>
            <Grid item xs={4}>
              <FormInput
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                variant="outlined"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today,
                }}
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
                {isEdit ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Student_Form;
