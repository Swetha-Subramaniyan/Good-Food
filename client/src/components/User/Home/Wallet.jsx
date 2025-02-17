
// import React, { useState } from 'react';
// import './Wallet.css';

// const Wallet = () => {
// const [walletBalance, setWalletBalance] = useState(0);
// const [refundedPrice, setRefundedPrice] = useState('');
// const [reason, setReason] = useState('');
// const [subscribedPrice, setSubscribedPrice] = useState('');
// const [subscribedPlan, setSubscribedPlan] = useState('');
// const [pendingRefunds, setPendingRefunds] = useState([]);
// const [skippedMeals, setSkippedMeals] = useState([]);

// return (

// <h2 style={{ marginTop: '2rem' }}>Wallet & Refunds


// <div className='wallet-dashboard'>
// <div className='wallet-section'>
//   <h4>Wallet Balance: ₹{walletBalance}</h4>
// </div>
// </div>

// <div className='wallet-container'>
// <div className='refund-section'>
//   <h4>Refund Request</h4>
//   <label>Refunded Price:</label>
//   <input 
//     type='number' 
//     value={refundedPrice} 
//     onChange={(e) => setRefundedPrice(e.target.value)}
//   />

//   <label>Reason:</label>
//   <textarea 
//     value={reason} 
//     onChange={(e) => setReason(e.target.value)}
//   />
// </div>

// <div className='subscribed-section'>
//   <h4>Subscription Details</h4>
//   <label>Subscribed Price:</label>
//   <input 
//     type='number' 
//     value={subscribedPrice} 
//     onChange={(e) => setSubscribedPrice(e.target.value)}
//   />

//   <label>Subscribed Plan:</label>
//   <input 
//     type='text' 
//     value={subscribedPlan} 
//     onChange={(e) => setSubscribedPlan(e.target.value)}
//   />
// </div>
// </div>

// <div className='pending-refunds'>
// <h4>Pending Refunds</h4>
// <ul>
//   {pendingRefunds.length > 0 ? pendingRefunds.map((refund, index) => (
//     <li key={index}>{refund}</li>
//   )) : <p>No pending refunds.</p>}
// </ul>
// </div>

// <div className='skipped-meals'>
// <h4>Skipped Meals</h4>
// <ul>
//   {skippedMeals.length > 0 ? skippedMeals.map((meal, index) => (
//     <li key={index}>{meal}</li>
//   )) : <p>No skipped meals available for reordering.</p>}
// </ul>
// </div>
// </div>
// );

// export default Wallet;












import React, { useState } from 'react';
import './Wallet.css';

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [refundedPrice, setRefundedPrice] = useState('');
  const [reason, setReason] = useState('');
  const [subscribedPrice, setSubscribedPrice] = useState('');
  const [subscribedPlan, setSubscribedPlan] = useState('');
  const [pendingRefunds, setPendingRefunds] = useState([]);
  const [skippedMeals, setSkippedMeals] = useState([]);

  return (
    <div>
      <h2 style={{ marginTop: '2rem' }}>Wallet & Refunds</h2>

      <div className="wallet-dashboard">
        <div className="wallet-section">
          <h4>Wallet Balance: ₹{walletBalance}</h4>
        </div>
      </div>

      <div className="wallet-container">
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
      </div>

      <div className="pending-refunds">
        <h4>Pending Refunds</h4>
        <ul>
          {pendingRefunds.length > 0 ? pendingRefunds.map((refund, index) => (
            <li key={index}>{refund}</li>
          )) : <p>No pending refunds.</p>}
        </ul>
      </div>

      <div className="skipped-meals">
        <h4>Skipped Meals</h4>
        <ul>
          {skippedMeals.length > 0 ? skippedMeals.map((meal, index) => (
            <li key={index}>{meal}</li>
          )) : <p>No skipped meals available for reordering.</p>}
        </ul>
      </div>
    </div>

  );
};

export default Wallet;