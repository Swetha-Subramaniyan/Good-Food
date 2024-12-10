// import React from 'react';
// import './SubscriptionCalender.css';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
  
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.0, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// const SubscriptionCalender = () => {
//   return (
//     <> 
//      <div className='order-header'> Subscription Details </div>
//      <br/>

//      <TableContainer component={Paper}

// sx={{
//     width: '80%', 
//     display: 'flex', 
//     flexWrap:'wrap',
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     margin: '0 auto', 
    
//   }}
 
//  >
//   <Table sx={{ minWidth: 700 }} aria-label="customized table">
//     <TableHead>
//       <TableRow>
//         <StyledTableCell>Date </StyledTableCell>
//         <StyledTableCell align="right"> Breakfast </StyledTableCell>
//         <StyledTableCell align="right"> Lunch </StyledTableCell>
//         <StyledTableCell align="right"> Dinner </StyledTableCell>
       
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows.map((row) => (
//         <StyledTableRow key={row.name}>
//           <StyledTableCell component="th" scope="row">
//             {row.name}
//           </StyledTableCell>
//           <StyledTableCell align="right">{row.calories}</StyledTableCell>
//           <StyledTableCell align="right">{row.fat}</StyledTableCell>
//           <StyledTableCell align="right">{row.carbs}</StyledTableCell>
         
//         </StyledTableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>

    
    
//     </>
   
//   )
// }

// export default SubscriptionCalender





import React, { useState } from 'react';
import './SubscriptionCalender.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox'; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '10px', 
    height: '55px',
    fontSize: '18px',
    fontWeight:'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '3px', 
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

function createData(name, breakfastChecked, lunchChecked, dinnerChecked) {
  return { name, breakfastChecked, lunchChecked, dinnerChecked };
}

const rows = [
  createData('2024-12-06', true, true, true),
  createData('2024-12-07', true, true, true),
  createData('2024-12-08', true, true, true),
  createData('2024-12-09', true, true, true),
  createData('2024-12-10', true, true, true),
];

const SubscriptionCalender = () => {
  const [rowData, setRowData] = useState(rows);

  const handleCheckboxChange = (event, rowIndex, column) => {
    const newRowData = [...rowData];
    newRowData[rowIndex][column] = event.target.checked;
    setRowData(newRowData);
  };

  return (
    <>
      <div className="order-header">Subscription Details</div>
      <br /><br/>
      <TableContainer
        component={Paper}
        sx={{
          width: '80%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Breakfast</StyledTableCell>
              <StyledTableCell align="center">Lunch</StyledTableCell>
              <StyledTableCell align="center">Dinner</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, rowIndex) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox
                    checked={row.breakfastChecked}
                    onChange={(event) =>
                      handleCheckboxChange(event, rowIndex, 'breakfastChecked')
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox
                    checked={row.lunchChecked}
                    onChange={(event) =>
                      handleCheckboxChange(event, rowIndex, 'lunchChecked')
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox
                    checked={row.dinnerChecked}
                    onChange={(event) =>
                      handleCheckboxChange(event, rowIndex, 'dinnerChecked')
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SubscriptionCalender;
