import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells,filterFn) {
  const classes = useStyles();
  const pages = [5, 10, 15, 20, 25];//element display in single page 

  //useState 
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBY, setOrderBy] = useState();


  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>//to show content in Table
  );



  //Table Head assending,dissending,filtering
  const TblHead = (props) => {

    const handleSort=(cellId)=>{
      const isAsc=orderBY===cellId && order==='asc';
      setOrder(isAsc?'desc':'asc')
      setOrderBy(cellId)
    }
    return (<TableHead>
      <TableRow>
      
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}
          sortDirection={orderBY===headCell.id ? order : false }>
              {headCell.disablesorting?headCell.label:
          <TableSortLabel 
          active={orderBY===headCell.id}
          direction={orderBY===headCell.id ? order:'asc'}
          onClick={()=>handleSort(headCell.id)}>

          {headCell.label}

          </TableSortLabel>}

          </TableCell>
        ))}
        
      </TableRow>
    </TableHead>)
  };








  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


const Stablesort=(array,comparator)=>{   //for sorting array comparison
  const stabilizeThis=array.map((el,index)=>[el,index])
  stabilizeThis.sort((a,b)=> {
    const order=comparator(a[0],b[0]);
    if(order!==0) return order;
    return a[1]-b[1];
  });
  return stabilizeThis.map((el)=>el[0]);
}

function getComparator(order,orderBY){
  return order= 'desc'?(a,b)=> descendingComparator(a,b,orderBY):(a,b)=> -descendingComparator(a,b,orderBY)
}
function descendingComparator(a,b,orderBY){
  if(b[orderBY]<a[orderBY]){
  return -1
  }
  if(b[orderBY]>a[orderBY]){
  return 1
  }
  return 0;

}


  const handlePagingAndSorting = () =>{//To sort & for using Pagination
    return Stablesort(filterFn.fn(records),getComparator(order,orderBY)).slice(page * rowPerPage, (page + 1) * rowPerPage);
  }

    //Paginating of the page
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    ></TablePagination>
  );

  return {
    TblContainer,
    TblHead,
    TblPagination,
    handlePagingAndSorting,
    setPage
  };
}
