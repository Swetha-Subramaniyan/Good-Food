
import React from 'react';
import './MainSubscription.css';
import { Link, useNavigate } from 'react-router-dom';






const MainSubscription = () => {
  const navigate= useNavigate()

  const Add =()=>{
    navigate ('/user/Payment')
  }



  return (
    <> 
    <div className="back">
    <h1 className="heading"> Choose Your Plan for Subscription!</h1>
    
      <div className="choose-plan">
          <h2 className="combo">
            Individual Pack <br />
            <Link to ='/user/IndividualPack'>
            <button>View</button>
            </Link>
          </h2>

        <h2 className="comboo">
          Combo Budget Plan <br/>
          <Link to="/user/IndividualPack" >
            <button>View</button>
          </Link>
        </h2>
        
        <h2 className="combooo">
          Combo Elite Plan  <br />
          <Link to="/user/IndividualPack">
            <button>View</button>
          </Link>
        </h2>
      </div>
      
      <div className='sub' onClick={Add}> Subscribe</div> 
      
      
    </div>
    </>
  );
};

export default MainSubscription;
