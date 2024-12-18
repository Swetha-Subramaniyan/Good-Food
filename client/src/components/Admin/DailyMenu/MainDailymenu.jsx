import React from 'react'
import MainSidebar from '../AdminSidebar/MainSidebar'
import './MainDailymenu.css'

const MainDailymenu = () => {
  return (
    <> 
    <div> <MainSidebar/></div>
    <h2> Daily Food Items </h2>
    <br/>
    <div className='day-position'> 
    <div className='day-dropdown'> 
  Select Day 
  <select>
    <option value="monday">Monday</option>
    <option value="tuesday">Tuesday</option>
    <option value="wednesday">Wednesday</option>
    <option value="thursday">Thursday</option>
    <option value="friday">Friday</option>
    <option value="saturday">Saturday</option>
    <option value="sunday">Sunday</option>
  </select>
</div>
<div className='day-dropdown'> 
  Select Catagory
  <select> 
    <option> Dosa </option>
    <option> Poori</option>
    <option> Idly</option>
    <option> Chappathi </option>
  </select>
</div >
<div className='day-dropdown'> 
  Select Type
  <select> 
    <option> BreakFast </option>
    <option> Lunch </option>
    <option> Dinner </option>  
  </select>
</div >
<div className='day-save'> 
<label style={{textAlign:'center', fontWeight:'bold', fontSize:'1.3rem'}}> Save </label> 
</div>
</div>
   
    </>
  )
}

export default MainDailymenu