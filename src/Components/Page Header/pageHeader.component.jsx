import { Card, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles=makeStyles(theme=>({
  root:{
    background:"#ede8ed"
  },
  PageHeader:{
    padding:theme.spacing(4),
    display:"flex",
    marginBottom:theme.spacing(2),
  },
  icon:{
    padding:theme.spacing(2),
    display:"inline-block",
    color:"#3c44b1"
  },
  pageTitle:{
    marginLeft:theme.spacing(4),
    
  },
  subtitle:{
    opacity:'0.6',
  }
}))

export default function PageHeader(props) {

  const { title, subtitle, Icon } = props;

  const classes=useStyles();
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.PageHeader}>
        <Card className={classes.icon}>
        {Icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography varient="h6" component="div">
            {title}
          </Typography>
          <Typography className={classes.subtitle} varient="subtitle2" component="div">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
