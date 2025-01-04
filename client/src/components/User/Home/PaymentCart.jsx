import React from 'react';
import './PaymentCart.css';



import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const PaymentCart = () => {


    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const handlePayment = () => {
  
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 240000 );
  
  
    };



  return (
    <> 
    <div className='details-back'>
        <div className="form-container">
          <h2>Payment Details</h2><br/>
 
 <form>
     <div className='address-fontsize'>      
    <div> Delivery Address <textarea/></div>
    <div> Phone Number <input/> </div>
    </div> 

 <div className="subscription-details">                            
<div className="payment-method">
          <div>Select Payment Method</div>
        </div>        
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group">
        <FormControlLabel value="fGoogle Pay" control={<Radio />}  label="Google Pay" sx={{ color: 'black' }} />
        <FormControlLabel value="Phone Pay" control={<Radio />} label="Phone Pay" sx={{ color: 'black' }} />
        <FormControlLabel value="Card" control={<Radio />} label="Card" sx={{ color: 'black' }} />
      </RadioGroup>
    </FormControl>
    </div>  

       <div className='update-profile'> 
         <button> Edit </button> 
        <button> Save</button>  
    </div> 
            <div className="form-group">              
              <Link to={'/user/Home'}>
              <button onClick={handlePayment} className='place-order-item'> Place Order </button> 
              </Link>  
            </div>
            {paymentSuccess && (
              <Alert severity="success">Payment Success!</Alert>
            )}
            
          </form>          
        </div>
      </div>
    </>   
  )
}

export default PaymentCart