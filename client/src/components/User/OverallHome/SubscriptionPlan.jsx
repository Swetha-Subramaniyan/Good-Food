import React, {useState} from 'react'
import './SubscriptionPlan.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SubscriptionPlan = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIndividuals = () => {
        setIsModalOpen(true);
      };


      const closeModal = () => {
        setIsModalOpen(false);
      };
     
    //   const handleIndividual = () => {
    //     setIsModalOpen(true);
    //   };
     
     const navigate = useNavigate();

      const handleCost = () => {
        navigate('/user/individualPackBreakfast');
      };
     
      const handleCostLunch = () => {
        navigate('/user/individualPackLunch');
      };
     
      const handleCostDinner = () => {
        navigate('/user/individualPackDinner');
      };

  return (
    <> 
    
    <div id='plans-section'> </div>
    <div style={{marginTop:'3rem'}}> 
        <h1 className="home-heading text-center">Choose Your Plan for Subscription!</h1> </div>
        <div className='plans-head'>
          <h2 className="comm">
            Individual Pack <br />
            <button onClick={handleIndividuals}>View</button>
          </h2>
          <div style={{height:'100vh'}} > 
          
          <div id='planss-section'> 
          <h2 className="comm">
            Combo Budget Plan <br />
            <Link to="/user/BudgetCombo">
              <button>View</button>
            </Link>
          </h2>
          </div>
          </div>
          <div style={{height:'100vh'}} > 
          <div id='plansss-section'> 
          <h2 className="comm">
            Combo Elite Plan <br />
            <Link to="/user/EliteCombo">
              <button>View</button>
            </Link>
          </h2>
          </div>  
        </div>  
        </div>  


        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="closee-btn" onClick={closeModal}>X</button>
              <table className="styled---table">
                <thead>
                  <tr>
                    <th colSpan={2}> Breakfast</th>
                    <th colSpan={2}> Lunch</th>
                    <th colSpan={2}> Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                      <button onClick={handleCost}> Budget </button>
                    </td>
                    <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                      <button onClick={handleCost}> Elite  </button>
                    </td>
                    <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                      <button onClick={handleCostLunch}> Budget </button>
                    </td>
                    <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                      <button onClick={handleCostLunch}> Elite  </button>
                    </td>
                    <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                      <button onClick={handleCostDinner}> Budget  </button>
                    </td>
                    <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                      <button onClick={handleCostDinner}> Elite  </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
    </>
  )
}

export default SubscriptionPlan