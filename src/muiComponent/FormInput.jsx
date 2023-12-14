import React from "react";
import TextField from "@mui/material/TextField";

function FormInput({ label, name, type, value, onChange }) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
}

export default FormInput;
