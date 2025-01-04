import React from 'react'
import './MainAdminOrderList.css'
import MainSidebar from '../AdminSidebar/MainSidebar'

const MainAdminOrderList = () => {
  return (
    <> 
    <div> <MainSidebar/> </div>
    <table className="styled-table"> 
      <tr> 
        <th rowSpan={2}> User Name/ ID</th>
        <th colSpan={2}> Subscription Plan </th>
        <th rowSpan={2}> Breakfast</th>
        <th rowSpan={2}> Lunch</th>
        <th rowSpan={2}> Dinner</th>
      </tr>
      <tr> 
        
        <th> Budget </th>
        <th> Elite </th>
       
      </tr>
      <tr> 
        <td> GF001 </td>
        <td> Budget</td>
        <td> </td>
        <td> 1 </td>
        <td> 1</td>
        <td>1 </td>
      </tr>
    </table>
    </>
  )
}

export default MainAdminOrderList 
