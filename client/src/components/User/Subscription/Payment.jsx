// import React from 'react'
// import './Payment.css'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import { useState } from 'react';
// import Alert from '@mui/material/Alert';
// import { Link } from 'react-router-dom';
// import MoneyTransfer from './MoneyTransfer';

// const Payment = () => {

//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const handlePayment = () => {

//     setPaymentSuccess(true);
//     setTimeout(() => {
//       setPaymentSuccess(false);
//     }, 240000 );


//   };

//   return (
//     <>

// <div className='details-back'>
//         <div className="form-container">
//           {/* <h2>Subscription Details</h2><br/> */}
//  <form>
//         <div className="subscription-details">
//         <h2>Subscription Details</h2>
//         <div className="form-group">
//     <label>Customer ID:</label>
//     <span>GF001</span>
//   </div>
//   <div className="form-group">
//     <label>Subscription Plan:</label>
//     <span>Combo Budget</span>
//   </div>
  
//   <div className="form-group">
//     <label>Subscription Price:</label>
//     <span>₹200</span>
//   </div>

//   <div className="form-group">
//     <label>Subscription Days:</label>
//     <span>30 Days</span>
//   </div>

//   <div className="form-group">
//     <label>Starting Date:</label>
//     <span>01-12-2024</span>
//   </div>

//   <div className="form-group">
//     <label>Ending Date:</label>
//     <span>01-01-2025</span>
//   </div>

//   <div className="form-group">
//     <label>Subscription Validity:</label>
//     <span>45 Days</span>
//   </div>
// </div>
//             <br/><br/>

//             <div className='details-back'>
//         <div className="form-container">
//           <h2>Food Delivery Details </h2><br/>
//  <form>
//   <div className="form-group">
//     <label>Name:</label>  
//     <span><input/></span>
//   </div>

//   <div className="form-group">
//     <label>Email ID:</label>
//     <span> <input/></span>
//   </div>

//   <div className="form-group">
//     <label>Phone Number:</label>
//     <span> <input/> </span>
//   </div>

//   <div className="form-group">
//     <label>Delivery Address 1:</label>
//     <span> <input/></span>
//   </div>

//   <div className="form-group">
//     <label>Street / LandMark:</label>
//     <span><input/> </span>
//   </div>

//   <div className="form-group">
//     <label> City / Pincode : </label>
//     <span><textarea/></span>
//   </div> 
//   <div className="form-group">
//     <label>Delivery Address 2:</label>
//     <span> <input/></span>
//   </div>

//   <div className="form-group">
//     <label>Street / LandMark:</label>
//     <span><input/> </span>
//   </div>

//   <div className="form-group">
//     <label> City / Pincode : </label>
//     <span><textarea/></span>
//   </div> 

//   <button className='submit-color' style={{padding:'6px', justifyContent:'center', marginLeft:'18rem', borderRadius:'5px'}}> Submit </button>
 

//             <br/>   
//        </form>
//      </div>
//       </div>

//             <div className="form-group">              
//               <Link to={'/user/MoneyTransfer'}>
//               <button onClick={handlePayment} className='c-t-pay' > Checkout to Payment</button> </Link>  
//             </div>
//             {paymentSuccess && (
//               <Alert severity="success">Payment Success!</Alert>
//             )}
            
//           </form>
          
//         </div>
//       </div>
//     </>
//   )
// }

// export default Payment





import React, { useState } from 'react';
import './Payment.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState('Combo'); // Default subscription plan

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 240000);
  };

  const handlePlanChange = (event) => {
    setSubscriptionPlan(event.target.value);
  };

  return (
    <>
      <div className="details-back">
        <div className="form-container">
          <form>
            <div className="subscription-details">
              <h2>Subscription Details</h2>
              <div className="form-group">
                <label>Customer ID:</label>
                <span>GF001</span>
              </div>
              <div className="form-group">
                <label>Subscription Plan:</label>
                <span>
                  <select
                    value={subscriptionPlan}
                    onChange={handlePlanChange}
                    style={{ padding: '5px', borderRadius: '5px' }}
                  >
                    <option value="Individual">Individual Pack</option>
                    <option value="Combo">Combo Budget</option>
                    <option value="ComboElite">Combo Elite</option>
                    
                  </select>
                </span>
              </div>
              <div className="form-group">
                <label>Subscription Price:</label>
                <span>₹200</span>
              </div>
              <div className="form-group">
                <label>Subscription Days:</label>
                <span>30 Days</span>
              </div>
              <div className="form-group">
                <label>Starting Date:</label>
                <span>01-12-2024</span>
              </div>
              <div className="form-group">
                <label>Ending Date:</label>
                <span>01-01-2025</span>
              </div>
              <div className="form-group">
                <label>Subscription Validity:</label>
                <span>45 Days</span>
              </div>
            </div>

            <br />
            <div className="details-back">
              <div className="form-container">
                <h2>Food Delivery Details</h2>
                <br />
                <form>
                  <div className="form-group">
                    <label>Name:</label>
                    <span>
                      <input />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Email ID:</label>
                    <span>
                      <input />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <span>
                      <input />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Delivery Address 1:</label>
                    <span>
                      <input />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Street / LandMark:</label>
                    <span>
                      <input />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>City / Pincode:</label>
                    <span>
                      <textarea />
                    </span>
                  </div>

                  {(subscriptionPlan === 'Combo' || subscriptionPlan === 'ComboElite') && (
                    <>
                      <div className="form-group">
                        <label>Delivery Address 2:</label>
                        <span>
                          <input />
                        </span>
                      </div>
                      <div className="form-group">
                        <label>Street / LandMark:</label>
                        <span>
                          <input />
                        </span>
                      </div>
                      <div className="form-group">
                        <label>City / Pincode:</label>
                        <span>
                          <textarea />
                        </span>
                      </div>
                    </>
                  )}

                  <button
                    className="submit-color"
                    style={{
                      padding: '6px',
                      justifyContent: 'center',
                      marginLeft: '18rem',
                      borderRadius: '5px',
                    }}
                  >
                    Submit
                  </button>
                  <br />
                </form>
              </div>
            </div>

            <div className="form-group">
              <Link to={'/user/MoneyTransfer'}>
                <button onClick={handlePayment} className="c-t-pay">
                  Checkout to Payment
                </button>
              </Link>
            </div>
            {paymentSuccess && <Alert severity="success">Payment Success!</Alert>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
