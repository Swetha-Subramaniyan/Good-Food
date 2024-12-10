import React from 'react'
import './MainAddSubscription.css'
import { Link } from 'react-router-dom'

const MainAddSubscription = () => {
  return (
   <> 
   <div className='add-butt' >  
   <button> Add </button> </div> <br/>
  <div className='back-admin'> 
   <div className='admin-subscription'> 
    <h3> Subscription Plan Name </h3>
    <input/>
   </div>
   <div className='admin-subscription'> 
    <h3> Enter the 1 Day Price</h3>
    <input/>
   </div>
   <div className='admin-subscription'> 
    <h3> Enter the 15 Days Price</h3>
    <input/>
   </div>
   <div className='admin-subscription'> 
    <h3> Enter the 30 Days Price</h3>
    <input/>
   </div>
   <div className='admin-submit'> 
   <Link to={'/admin/addmenuitems'}> 
    <button> Save</button> 
    </Link>
   </div>
   </div>
   
   </>
  )
}

export default MainAddSubscription