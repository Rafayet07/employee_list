import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Control from "../controls/control.component";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    marginLeft: theme.spacing(25),
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  DialogTitle:{
    paddingRight:'0px'
  }
}));
export default function PopUp(props) {
  const { title, children, openPopUp, setOpenPopUp } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={openPopUp}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.DialogTitle}>
        <div style={{display:'flex'}}>
          <Typography varient="h6" component="div" style={{flexGrow:1}}>
            {title}
          </Typography>
          <Control.ActionButton
          color="secondary"
          onClick={()=>setOpenPopUp(false)}
          >
            <Close/>
          </Control.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
