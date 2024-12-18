import React from 'react'
import './MainSubscribedUsers.css'
import MainSidebar from '../AdminSidebar/MainSidebar'

const MainSubscribedUsers = () => {
  return (
   <> 
   <div> <MainSidebar/></div>
   <h2> Subscribed Users</h2>

    <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th> Name</th>
              <th> Subscription Plan  </th>
              <th> Price </th>
              <th> Meal Type</th>
              <th> Days </th>
              <th> Date</th>

             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Saranya </td>
              <td> Combo Budget Elite</td>
              <td> ₹6000</td>
              <td> All</td>
              <td> 30</td>
              <td> 21-12-2024</td>
            
             
            
            </tr>
          </tbody>
        </table>
      </div>

    </>
  )
}

export default MainSubscribedUsers

