import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from "@material-ui/core";

const useStyles=makeStyles(theme=>({
  appBar:{
    backgroundColor:'#fff',
  },
  searchInput:{
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize:'0.8rem',
    fontWeight:"bold",
    border: "1px solid #333",
    borderRadius:theme.spacing(1),
    '&:hover':{
      backgroundColor:"#14f5ea",
    },
    "& .MuiSvgIcon-root":{
      marginRight:theme.spacing(1),
    }
  }
}))

export default function Header() {
  const classes=useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item >
            <InputBase 
              placeholder='search Topics'
              className={classes.searchInput}
              startAdornment={<SearchIcon  fontSize='small'/>}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <ChatBubbleOutlineIcon fontSize='small'/>
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color='primary'>
                <NotificationsNoneIcon fontSize='small'/>
              </Badge>
            </IconButton>
            <IconButton>
                <SettingsPowerIcon fontSize='small'/>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
