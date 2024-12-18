import React from 'react'
import './MainSubscriptionMenuList.css'
import MainSidebar from '../AdminSidebar/MainSidebar'



const MainSubscriptionMenuList = () => {

  return (
    <> 
       
<div><MainSidebar/> </div>
<h2> Subscription Food Items</h2>
<br/>
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Product Image</th>
              <th> Name</th>
              <th> Catogary </th>
              <th> Price </th>
              <th> Subscription Plan  </th>
              <th> Days </th>
              
              <th>  Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Podi Dosa</td>
              <td> Dosa</td>
              <td> ₹60</td>
              <td> Combo Budget Elite</td>
              <td> 30</td>
            
              <td> Delete</td>
            
            </tr>
          </tbody>
        </table>
      </div>

    
    </>
  )
}

export default MainSubscriptionMenuList