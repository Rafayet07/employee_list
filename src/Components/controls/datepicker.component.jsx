import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

export default function DatePicker(props) {
  const { value, name, onChange, label } = props;
  const handleDefaultEvent = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        name={name}
        variant="inline"
        inputVariant="outlined"
        label={label}
        formate="MMM/dd/yyyy"
        value={value}
        onChange={(date) => onChange(handleDefaultEvent(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
