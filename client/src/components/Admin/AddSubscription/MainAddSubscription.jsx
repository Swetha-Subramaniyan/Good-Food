
import React, { useState } from 'react'
import './MainAddSubscription.css'
import { Link } from 'react-router-dom'
import MainSidebar from '../AdminSidebar/MainSidebar';

const MainAddSubscription = () => {
  
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSaveNext= ()=>{
    alert(' Subscription Plan Saved Successfully!')
  }

  return (
    <>
    <div> <MainSidebar/> </div>
      <div className='sub-plan'> Subscription Plans</div> 
      <div className='add--button'>
        <button onClick={toggleFormVisibility}> Add Plan </button>
      </div>     
      {isFormVisible && (

        <div className='back--admin'>
      
          <div className='plan-style'> 
<div className='pop-break'> 

<label> Plan Name <input/></label> 
<label> Number of Days <input/></label> 
<label> Number of Days Validity <input/></label> 
<label> Price <input/></label> 
<label> Breakfast Quantity <input/></label> 
<label> Lunch Quantity <input/></label> 
<label> Dinner Quantity <input/></label> 
</div>

</div>
<div className='admin--submit'>
            <button onClick={handleSaveNext}> Save</button>
            <Link to={'/admin/addmenuitems'}>
              <button> Next </button>
            </Link>
          </div>

        </div>

      )}
    </>
  );
}

export default MainAddSubscription;
