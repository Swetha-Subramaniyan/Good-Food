import React from 'react'
import './MainAddMenuItems.css'
import MainSidebar from '../AdminSidebar/MainSidebar'
import { useState } from 'react'

const MainAddMenuItems = () => {

  const [isFormVisible, setFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSaveSuccess= ()=>{
    alert(' Food Item Saved Successfully!')
  }

  return (
    <> 
    <div> <MainSidebar/> </div>
    <h3 className='title'> Add Food Items  </h3>
    <div className='menu-add'>  <button onClick={toggleFormVisibility} > Add Items </button>  </div>
    {isFormVisible && (
    <div className='admin-ground'> 
    <div className='menu-add-new'> 
  <div> 
    <h3> Upload Image</h3>
    <input type='file'  style={{backgroundColor:'white'}}  />
  </div>
  <div> 
    <h3> Product Name </h3>
    <input type='text' /> 
  </div>
  <div> 
    <h3> Product Description</h3>
    <input type='textarea' />
  </div>
  <div> 
    <h3> Product Type </h3>
    <input/>
  </div>
  <div> 
    <h3> Product Price </h3>
    <input/>
  </div>
  <div className='item-save'> <button onClick={handleSaveSuccess}> Save</button> </div>
  
  </div>
  </div>
   )}
    </>
    
  )
}

export default MainAddMenuItems