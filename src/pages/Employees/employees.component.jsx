import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import {  Search } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from "@material-ui/icons/Add";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import React, { useEffect, useState } from "react";
import EmployeesForm from "./employees_form.component";
import Control from "../../Components/controls/control.component";
import PageHeader from "../../Components/Page Header/pageHeader.component";
import PopUp from "../../Components/Pop_Up/popUp.component";
import useTable from "../../Components/UseTable/useTable.component";
import * as employeeService from "../../Services/service.component";

//this is the parent component of emplyee form

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  serchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));
const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department"},
  { id: "actions", label: "Actions", disablesorting: true }
];
export default function Employees() {
  const classes = useStyles();
const[openPopUp,setOpenPopUp]=useState(false);
const [recordForEdit,setRecordForEdit]=useState(null);

  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    handlePagingAndSorting,
    setPage,
  } = useTable(records, headCells, filterFn);

  //I create a useState() "pageSearch", it only helps me to detect if I am searching.
  const [pageSearch, setPageSearch] = useState(false);

  //HERE, when "pageSearch" detect a change, put 0 in setPage().
  useEffect(() => {
    setPage(0); //With this, my table return to page 1
  }, [pageSearch, setPage]);

  //SearchFunction
  const handleSearch = (e) => {
    let target = e.target;

    //setPageSearch is changing when i am searching
    target.value === "" ? setPageSearch(false) : setPageSearch(true);

    setFilterFn({
      fn: (items) => {
        if (target.value !== "") {
          return items.filter((x) =>
          x.fullName.toLowerCase().includes(target.value),
          );
        }else {
          return items;
        }
      },
    });
  };

  // const handleSearch = e => {
  //       let target = e.target;
  //       setFilterFn({
  //           fn: items => {
  //               if (target.value === "")
  //                   return items;
  //               else
  //                   return items.filter(x => x.fullName.toLowerCase().includes(target.value))
  //           }
  //       })
  //   }
  //pop up submit AddNew button Work
  const addOrEdit=(employee,ResetF)=>{
    if(employee.id===0){
    employeeService.insertEmployee(employee)}
    else{
    employeeService.updateEmployee(employee)}

    ResetF()
    setRecordForEdit(null)
    setOpenPopUp(false)
    setRecords(employeeService.getAllEmployees())
  }

  const openInPopUp=(items)=>{
    setRecordForEdit(items);
    setOpenPopUp(true);
  }
  return (
    <>
      <PageHeader /*PageHeader is for any single page so it's here as emplyess page header */
        title="New Employees"
        subtitle="Validated Form"
        Icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Control.Input
            label="Search Employees"
            className={classes.serchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Control.Button
            text="ADD NEW"
            varient="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={()=>{setOpenPopUp(true);setRecordForEdit(null)}}
          />
        </Toolbar>
        
        <TblContainer>
          <TblHead />
          <TableBody>
            {handlePagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Control.ActionButton
                  color='primary'>
                  <EditOutlinedIcon
                    onClick={()=>{openInPopUp(item)}}
                  />

                  </Control.ActionButton>
                  <Control.ActionButton
                  color='secondary'>
                  <CloseIcon/>

                  </Control.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <PopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        title='Employee Registration Form'
      >
        <EmployeesForm
        recordForEdit={recordForEdit}
        addOrEdit={addOrEdit}
         />
      </PopUp>
    </>
  );
}
