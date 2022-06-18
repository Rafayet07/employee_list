import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";



export function useForm(initialFValues,validateOnChange=false,validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors,setErrors]=useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    if(validateOnChange)
    validate({[name]:value})
  };

  const ResetF=()=>{
    setValues(initialFValues);
    setErrors({});
  }
  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    ResetF
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));
export function Form(props) {
  const classes = useStyles();

  const {children,...other}=props;
  return <form className={classes.root} autoComplete='off' {...other}>{props.children}</form>;
}
