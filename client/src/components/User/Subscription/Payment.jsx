import React from 'react'
import './Payment.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';



const Payment = () => {

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
          <h2>Subscription Details</h2><br/>
          <form>
          <div className="form-group">
              <h3>Subscription Plan: <span >  Combo Budget </span> </h3>
           
            </div> <br/>
            <div className="form-group">
              <h3>Subscription Price: <span >  ₹200 </span>  </h3>
             
            </div> <br/>
            <div className="form-group">
              <h3>Subscription Days: <span >  30 Days </span>  </h3>
             
            </div>
            
             <br/><br/>
           
                    
<div className="payment-method">
          <h3>Select Payment Method</h3>
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
            <div className="form-group">
              {/* <button type="submit">Save</button>  */}
              <Link to={'/user/Payment'}>
              <button onClick={handlePayment} className='c-t-pay' > Checkout to Payment</button> </Link>  
            </div>

            {paymentSuccess && (
              <Alert severity="success">Payment Success!</Alert>
            )}
            
            <div className='next' >
    <Link to={'/user/Home'}> 
  <button> Next</button> 
  </Link>
  </div> 
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Payment


