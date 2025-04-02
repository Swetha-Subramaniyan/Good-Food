
import React, { useState } from 'react';
import './Wallet.css';
import refund from '../../../assets/refundpolicy.jpg'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MainUserSidebar from '../UserSidebar/MainUserSidebar';

const Wallet = () => {
 
  const [refundedPrice, setRefundedPrice] = useState('');
  const [reason, setReason] = useState('');
  const [subscribedPrice, setSubscribedPrice] = useState('');
  const [subscribedPlan, setSubscribedPlan] = useState('');

  return (
    <>
    <MainUserSidebar/> 
    <div> 
<div> 
     </div>
      <h2 >Wallet & Refunds</h2> 
      {/* <div className='refund-price'>  
       <img src={refund} alt='refundpolicy' /> 
      </div>  */}

      <div className="wallet-dashboard">
        <div className="wallet-section">
          <h4>Terms and Conditions for Refund Policy</h4>
        </div> 
      </div>
      
       <div className='accordion-header'> 
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span"> Failed Delivery</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Delivery timings provided are approximate and may vary due to factors beyond our control, such as traffic and weather conditions.
Orders will be delivered to the addresses designated by you at the time of ordering, using our own delivery network or third-party delivery services.
If you fail to accept the delivery or provide appropriate instructions, all risk and responsibility for the goods will pass to you.
It is your responsibility to ensure that adequate arrangements, including access, are in place for the timely delivery of your order.
While we strive to meet the estimated delivery time, we cannot be held liable for any losses or expenses arising from late delivery.
If we are unable to deliver to your location, we will inform you and make arrangements for cancellation or delivery to an alternative address.
In the event of a failed delivery due to reasons beyond the customer's control, we will refund the full amount to the wallet within 15 to 20 business days.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Cancellation and Refund Policy </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          If you have subscribed for daily/weekly/monthly plan, orders can be cancelled any part of the time preferably by phone or Good Foods website/mobile application and the amount will be refunded subjected to following conditions: <br/> <br/>
In case of daily plan:1 days <br/> 
When you have opted for any meal plan and if you apply for cancellation 4 hrs prior to the delivery of the 1st meal then total cost of the subscription will be refunded to your wallet or 75% of the cost of subscription will be refunded.
<br/><br/> 
In case of half a month plan:15 days<br/> 
When you have opted for any meal plan and if you apply for cancellation 4 hrs prior to the delivery of the 1st meal then total cost of the subscription will be refunded to your wallet or 75% of the cost of subscription will be refunded.
When you have opted for any weekly plan (ie: 7days meals per week) and for example if you apply for cancellation after the 3rd day meal is delivered and 4 hrs prior to the delivery of 4th day meal, then 75% of the cost of remaining 4days meals will be refunded to your wallet.
<br/><br/> In case of monthly plan:30 days <br/> 
When you have opted for any meal plan and if you apply for cancellation 4 hrs prior to the delivery of the 1st meal then total cost of the subscription will be refunded to your wallet or 75% of the cost of subscription will be refunded.
When you have opted for any monthly plan (ie: 30days meals per month) and for example if you apply for cancellation after the 15th day meal is delivered and 4 hrs prior to the delivery of 16th day meal, then 75% of the cost of remaining 15days meals will be refunded to your wallet.
We may cancel an order if the product is not available for reasons that are not within our control. We will notify you if this is the case and return any payment that you have made.
If the cancellation was made in time as per above mentioned conditions, we will refund or refunded to your wallet with respective amount within 14 business days.
In the unlikely event that we deliver a wrong item, you have the right to reject the delivery of the wrong item and you shall be fully refunded for the missing item. If we can only do a partial delivery (a few items might be not available), we would inform you or propose a replacement for missing items. You have the right to refuse a partial order before delivery and get a refund.
Meal subscription plans have to be used during the period of validity. In case of the user not availing the meals during the specified period unless the cancellation is applied, the meals will lapse. Refund or extension of lapsed meal will not be possible. This is applicable to all subscriptions offered under Meal Plans by Good Foods.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>

      <div className="wallet-container">

      <div className="subscribed-section">
          <h4>Subscription Details</h4>
          <label style={{marginTop:'2rem'}}>Subscribed Price:</label>
          <input 
            type="number" 
            value={subscribedPrice} 
            onChange={(e) => setSubscribedPrice(e.target.value)}
          />

          <label>Subscribed Plan:</label>
          <input 
            type="text" 
            value={subscribedPlan} 
            onChange={(e) => setSubscribedPlan(e.target.value)}
          />
        </div>
        <div className="refund-section">
          <h4>Refund Request</h4>
          <label style={{marginTop:'2rem'}}>Refund Price:</label>
          <input 
            type="number" 
            value={refundedPrice} 
            onChange={(e) => setRefundedPrice(e.target.value)}
          />

          <label>Reason:</label>
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* <div className="subscribed-section">
          <h4>Subscription Details</h4>
          <label style={{marginTop:'2rem'}}>Subscribed Price:</label>
          <input 
            type="number" 
            value={subscribedPrice} 
            onChange={(e) => setSubscribedPrice(e.target.value)}
          />

          <label>Subscribed Plan:</label>
          <input 
            type="text" 
            value={subscribedPlan} 
            onChange={(e) => setSubscribedPlan(e.target.value)}
          />
        </div> */}
      </div>
    </div>
    </>
  );
};

export default Wallet;