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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

function Student_Form({ editID }) {
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

      // Get the formatted date string (MM/DD/YYYY)
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

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
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(">>>>>formData >>>>>", formData);
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
              {/* <FormInput
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                variant="outlined"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="MM/dd/yyyy"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                />
              </LocalizationProvider>
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
