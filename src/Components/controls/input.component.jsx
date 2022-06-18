import { TextField } from "@material-ui/core";
import React from "react";

export default function Input(props) {
  const { value, onChange, varient, error = null, label, name,...other } = props;
  return (
    <TextField
      varient={varient}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error:true , helperText: error })}
    />
  );
}
