import React from 'react'
import './MainListItem.css'
import MainSidebar from '../AdminSidebar/MainSidebar'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      padding: '0.2px', 
      height: '55px',
      

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein, status) {
    return { name, calories, fat, carbs, protein, status };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 'Edit / Delete'),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 'Edit / Delete'),
    createData('Eclair', 262, 16.0, 24, 6.0, 'Edit / Delete'),
    createData('Cupcake', 305, 3.7, 67, 4.3, 'Edit / Delete'),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 'Edit / Delete'),
  ];


const MainListItem = () => {

    const [orderStatus, setOrderStatus] = useState(rows); 
  return (
    <> 
   
<div><MainSidebar/> </div>
<h2>Food Items</h2>
<br/>

<TableContainer component={Paper} sx={{
        width: '80%', 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: '0 auto', 
      }}>
        <Table sx={{ minWidth: 70 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Product Image</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Product Catogary</StyledTableCell>
              <StyledTableCell align="center">Product Price</StyledTableCell>
              <StyledTableCell align="center"> Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderStatus.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                <StyledTableCell align="center">{row.protein}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>             
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}

export default MainListItem