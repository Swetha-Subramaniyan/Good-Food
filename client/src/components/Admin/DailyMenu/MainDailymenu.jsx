import React from 'react'
import './MainDailymenu.css'

const MainDailymenu = () => {
  return (
    <> 

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

{/* 
<br/>
<div className='days-section'> 
  <h3> Monday </h3>
  <h3> Tuesday </h3>
  <h3> Wednesday </h3>
  <h3> Thursday </h3>
  <h3> Friday </h3>
  <h3> Saturday</h3>
  <h3> Sunday</h3>
</div>
<br/>



<div> 
  <h2> Breakfast </h2>
</div>
<div className='dayy-dropdownn'> 
  Select Catagory
  <select> 
    <option> Dosa </option>
    <option> Poori</option>
    <option> Idly</option>
    <option> Chappathi </option>
  </select>
</div >
<br/>
<div> 
  <h2> Lunch </h2>
</div>
<div className='dayy-dropdownn'> 
  Select Catagory
  <select> 
    <option> Dosa </option>
    <option> Poori</option>
    <option> Idly</option>
    <option> Chappathi </option>
  </select>
</div >

<br/>
<div> 
  <h2> Dinner </h2>
</div>
<div className='dayy-dropdownn'> 
  Select Catagory
  <select> 
    <option> Dosa </option>
    <option> Poori</option>
    <option> Idly</option>
    <option> Chappathi </option>
  </select>
</div > */}



   
    </>
  )
}

export default MainDailymenu