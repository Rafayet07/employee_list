import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { text, size, color, onClick, varient, ...other } = props;
  const classes = useStyles();
  return (
    <MuiButton
      varient={varient || "contained"}
      size={size || "large"}
      color={color || "primary"}
      {...other}
      onClick={onClick}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
