import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles=makeStyles({
  sideBar:{
            // display:"grid",
            display:"flex",
            flexDirection:"column",
            position:"absolute",
            left: "0px",
            width: "320px",
            height: "150%",
            backgroundColor:"#253053"
      }
})

export default function SideMenu() {

  const classes=useStyles();
  return (
    <div className={classes.sideBar}>


      
    </div>
  )
}
