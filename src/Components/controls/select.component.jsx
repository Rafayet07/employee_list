import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

export default function Select(props) {
  const { value, name, label, onChange,error=null, options } = props;
  return (
    <FormControl varient="outlined" {...(error && { error:true})}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {
          options.map((value, index) => (
          <MenuItem key={index} value={value.id}>{value.title}</MenuItem>
        ))
        }

      </MuiSelect>
          {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
