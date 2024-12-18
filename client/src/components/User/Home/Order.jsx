import React from 'react'
import './Order.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '0.2px', 
    height: '55px',
    fontSize: '18px',
    fontWeight:'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    padding: '7px', 
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Order = () => {
  return (
    <> 
    <div className='order-header'> My Orders </div>
    <br/>
    <div className='date-box'>
      <input placeholder='Date'/>
    </div>
    <TableContainer component={Paper}

    sx={{
        width: '100%', 
        display: 'flex', 
        flexWrap:'wrap',
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: '0 auto', 
        paddingLeft:'1rem',
        paddingRight:'1rem'
        
      }}
     
     >
      <Table sx={{ minWidth: 70 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' >Item</StyledTableCell>
            <StyledTableCell align='center' >Price</StyledTableCell>
            <StyledTableCell align='center'>Quantity</StyledTableCell>
            <StyledTableCell align='center' >Total Price</StyledTableCell>
            <StyledTableCell align='center'> Status </StyledTableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" style={{textAlign:'center'}}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.fat}</StyledTableCell>
              <StyledTableCell align='center'>{row.carbs}</StyledTableCell>
              <StyledTableCell align='center'>{row.protein}</StyledTableCell>
              <StyledTableCell align='center'> Delivered</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Order

