import React, { useState } from 'react'
import './MainOverallHome.css'
import logo from '../../../assets/Foodlogo.jpg'
import { FaListCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";


import { Link, useNavigate } from 'react-router-dom';



const MainOverallHome = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIndividual = () => {
    setIsModalOpen(true); 
 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleCost =()=>{
    navigate('/user/individualPackBreakfast')
  }

  const handleCostLunch =()=>{
    navigate('/user/individualPackLunch')
  }

  const handleCostDinner =()=>{
    navigate('/user/individualPackDinner')
  }


  return (
    <> 
      <div className='food'> 
     <div className='logo-pic' > 
      <img src={logo} alt='food' style={{height:'6rem', width:'7rem', borderRadius:'5px'}}  /> 
     </div>
    <div className='home-head'> 
        <div> Home</div>
        <div> Individual Plan</div>
        <div> Combo Budget</div>
        <div> Combo Elite</div>
        <div> Contact Us</div>
        <div> Ideas to Improve!</div>      
    </div>
    <br/>
    <div className='home-header'> 
    <div> Freshly  Made Home Cuisine <br/>  Food Delivery Platform! </div>
    </div>
    <br/>
<div className='register'> 

    <div style={{backgroundColor:'coral'}}> <FaListCheck  /> 5.5L+  <span> Successful Orders </span>
    
    </div>
    <div > <FaDownload  />  3.5L+ <span>  Registered Customers </span></div> 
    </div>

    <div className='regi'> 

    <div> <PiCertificateBold size={25} /> 5.5L+  <span> Certified License  </span>
    
    </div>
    <div style={{backgroundColor:'orange'}}> <PiChefHatBold  size={25}/> 3.5L+ <span>  Sellers </span></div> 
    </div><br/>
    <h1 style={{display:'flex',justifyContent:'center'}}>  VISION & MISSION </h1> <br/>
    <div className='vision-back'> 
    <b className='vision-head'> Vision   </b>
    <div> 
        <span style={{marginLeft:'2rem'}}> </span>To nourish humanity with wholesome food and spread the joy of well-being.
        Our brand vision is to become the leading platform for healthy homemade food, where customers can trust and rely on us to understand and care for their needs while making a deeper social impact in the communities we serve. We strive to be an inclusive brand, promoting healthy eating lifestyles and equal opportunities for all.
     </div>
     </div>
     <br/>
     <div className='vision-back'> 
  <b className='vision-head'> Mission </b>
  <div> 
  <span style={{marginLeft:'2rem'}}> </span>Empowering communities with accessible and nutritious mom-food through technology and home kitchens.
      Our mission is to enable homemade food to be accessible to everyone, to improve well-being through the power of technology, and to unlock 100,000 home kitchens to create a better India in 2 years.
</div>
</div>
<br/><br/>
</div>

<h1 className="home-heading"> Choose Your Plan for Subscription!</h1>
<div className='plans-head'> 
<h2 className="comm">
            Individual Pack <br />
            <button onClick={handleIndividual}>View</button>
          </h2>

<h2 className="comm">
            Combo Budget Plan <br />
            <Link to="/user/IndividualPack">
              <button>View</button>
            </Link>
          </h2>
          <h2 className="comm">
            Combo Elite Plan <br />
            <Link to="/user/IndividualPack">
              <button>View</button>
            </Link>
          </h2>
</div>


{isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <table className="styled--table">
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
                    <button onClick={handleCost}> ₹200</button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCost}> ₹300 </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostLunch}> ₹200 </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostLunch}> ₹300 </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostDinner}> ₹200 </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostDinner}> ₹300 </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
          <br/> <br/> <br/> 
<h1 className='contact-details'> Contact Us </h1>

    </>   
  )
}

export default MainOverallHome
