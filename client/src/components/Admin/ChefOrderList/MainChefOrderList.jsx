import React, { useState } from 'react';
import './MainChefOrderList.css'
import MainSidebar from '../AdminSidebar/MainSidebar';


const MainChefOrderList = () => {
  return (
    <>   
    <div> <MainSidebar/> </div>
    <h2 style={{fontWeight:'bold'}}> Chef Order List</h2>
      <div className='date-header'>
        <h5>Date: 21-01-2024</h5>
      </div>
      
      <div>
        <table className="styled-table">
          <thead>
            <tr className='style-head'>
              <th colSpan={3}>Budget</th>
              <th colSpan={3}>Elite</th>  
            </tr>
            <tr> 
                <th> Breakfast</th>
                <th> Lunch</th>
                <th> Dinner</th>              
                <th> Breakfast</th>
                <th> Lunch</th>
                <th> Dinner</th>          
            </tr>
            
          </thead>
          <tbody>
            <tr> 
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>    
              <td>1</td>
              <td>1</td>           
            </tr>         
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MainChefOrderList