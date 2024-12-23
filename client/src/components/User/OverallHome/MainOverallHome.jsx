import React from 'react'
import './MainOverallHome.css'

const MainOverallHome = () => {
  return (
    <> 
   
    
    <div className='home-head'> 
        <div> Home</div>
        <div> Individual Plan</div>
        <div> Combo Budget</div>
        <div> Combo Elite</div>
        <div> Corporate Orders</div>
        <div> Contact Us</div>
        <div> Ideas to Improve</div>      
    </div>
    <br/>
    <div> 
        <img src='food'></img>
    </div>
    <div className='home-sub-plan'>
        <div> Choose the Subscription Plan </div> 
    </div>
    <div> <button> Individual Plan </button>  </div>
    <div> <button> Combo Budget Plan </button></div>
    <div> <button> Combo Elite Plan </button></div>

    </>
    
  )
}

export default MainOverallHome