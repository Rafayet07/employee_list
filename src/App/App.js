import './App.css';
import SideMenu from '../Components/SideMenu/sideMenu.component';
import Header from '../Components/Header/header.component';
import { createTheme,CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import Employees from '../pages/Employees/employees.component';

const theme=createTheme({
  palette:{
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    paddingLeft: "320px",
  },
}));
function App() {
  const classes=useStyles();
  return (
    <ThemeProvider theme={theme}>
    <SideMenu/>
    <div className={classes.appBar}>
    <Header />
    
    <Employees/>
    <CssBaseline/>
   </div>
  </ThemeProvider>
  );
}

export default App;
