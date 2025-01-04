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
    <h5> Upload Image</h5>
    <input type='file'  style={{backgroundColor:'white'}}  />
  </div>
  <div> 
    <h5> Product Name </h5>
    <input type='text' /> 
  </div>
  <div> 
    <h5> Product Description</h5>
    <input type='textarea' />
  </div>
  <div> 
    <h5> Product Type </h5>
    <input/>
  </div>
  <div> 
    <h5> Product Price </h5>
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