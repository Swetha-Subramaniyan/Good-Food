// import React from 'react'
// import './Account.css'

// const Account = () => {
//   return (
//     <> 
   
//     <h2 style={{marginTop:'2.5rem'}}> My Profile </h2>
//     <div className='form-container'> 
//     <div className='profile-form'> 
    
//              <div className="form-group">
//               <label>Name</label>
//               <input type="text" required />
//             </div>

//             <div className="form-group">
//               <label>Email ID</label>
//               <input type="email" required />
//             </div>

//             <div className="form-group">
//               <label>Phone Number</label>
//               <input type="tel" required />
//             </div>

//             <div className="form-group">
//               <label>Delivery Address 1</label>
//               <textarea required />
//             </div>
//             <div className="form-group">
//               <label>Street / LandMark</label>
//               <input type='text' required/>
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input type='text' required/>
//             </div>
//             <div className="form-group">
//               <label>Delivery Address 2</label>
//               <textarea />
//             </div>
//             <div className="form-group">
//               <label>Street / LandMark</label>
//               <input type='text' required/>
//             </div>
//             <div className="form-group">
//               <label>Area</label>
//               <input type='text' required/>
//             </div>
//             <div className="form-group">
//               <label>Pincode</label>
//               <input type='text' required/>
//             </div>
//             <div className="form-group">
//               <label>Subscription Plan</label>
//               <input/>
//             </div>
//             <div className="form-group">
//               <label>Subscription Days</label>
//               <input/>
//             </div>
//             <div className="form-group">
//               <label>Payment Method </label>
//               <input/>
//             </div>
//             <div className="form-group">
//               <label >Refer Your Friend and Get Discount</label>
              
//             </div>
//             <div className='form-edit-save'> 
//                 <button> Edit </button> <button> Save</button>
//             </div>

//             </div>
//     </div>
   
//     </>
//   )
// }

// export default Account






// import React from 'react'
// import './Account.css'

// const Account = () => {
//   return (
//     <> 
//       <h2 style={{ marginTop: '2.5rem' }}> My Profile </h2>
//       <div className='form-container'> 
//         <div className='profile-form'> 

//           <div className="form-group">
//             <label>Name</label>
//             <input type="text" required />
//           </div>

//             <div className="form-group">
//               <label>Email ID</label>
//               <input type="email" required />
//             </div>

//             <div className="form-group">
//               <label>Phone Number</label>
//               <input type="tel" required />
//             </div>
         

//           <div className="form-group">
//             <label>Delivery Address 1</label>
//             <textarea required />
//           </div>

//           <div className="form-group">
//             <label>Street / LandMark</label>
//             <input type='text' required />
//           </div>

//           <div className="form-group">
//             <label>City</label>
//             <input type='text' required />
//           </div>

//           <div className="form-group">
//             <label>Delivery Address 2</label>
//             <textarea />
//           </div>

//           <div className="form-group">
//             <label>Street / LandMark</label>
//             <input type='text' required />
//           </div>

//           <div className="form-group">
//             <label>Area</label>
//             <input type='text' required />
//           </div>

//           <div className="form-group">
//             <label>Pincode</label>
//             <input type='text' required />
//           </div>

//           <div className="form-group">
//             <label>Subscription Plan</label>
//             <input />
//           </div>

//           <div className="form-group">
//             <label>Subscription Days</label>
//             <input />
//           </div>

//           <div className="form-group">
//             <label>Payment Method </label>
//             <input />
//           </div>

          // <div className="form-group">
          //   <label>Refer Your Friend and Get Discount</label>
          // </div>

//           <div className='form-edit-save'> 
//             <button> Edit </button> <button> Save</button>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default Account



// import React from 'react'

// const Account = () => {
//   return (
//    <> 
//    <label> Name</label>
//    <input type='text'/>
   
//    </>
//   )
// }

// export default Account





import React from 'react'
import './Account.css'


const Account = () => {

  return (
    <>

<div className='details-back'>
        <div className="form-container">
          <h2>My Profile</h2><br/>
 <form>
        <div className="subscription-details">
  <div className="form-group">
    <label>Name:</label>  
    <span>Combo Budget</span>
  </div>

  <div className="form-group">
    <label>Email ID:</label>
    <span>₹200</span>
  </div>

  <div className="form-group">
    <label>Phone Number:</label>
    <span>30 Days</span>
  </div>

  <div className="form-group">
    <label>Delivery Address 1:</label>
    <span>01-12-2024</span>
  </div>

  <div className="form-group">
    <label>Street / LandMark:</label>
    <span>01-01-2025</span>
  </div>

  <div className="form-group">
    <label> City: </label>
    <span>45 Days</span>
  </div>
  <div className="form-group">
    <label> Delivery Address 2: </label>
    <span>45 Days</span>
  </div>
  <div className="form-group">
    <label> Street / LandMark: </label>
    <span>45 Days</span>
  </div>
  <div className="form-group">
    <label> Area:  </label>
    <span>45 Days</span>
  </div>
  <div className="form-group">
    <label> Pincode: </label>
    <span>45 Days</span>
  </div>
  <div className="form-group">
    <label> Subscription Plan:  </label>
    <span>45 Days</span>
  </div>
  <div className="form-group">
    <label> Subscription Days: </label>
    <span>45 Days</span>
  </div>  
</div>
            <br/>
      
 <div className="subscription-details">                            
<div className="payment-method">
        
          <h4 style={{fontWeight:'bold'}}>Refer Your Friend and Get Discount</h4>
</div>        
</div>   
       </form>
     </div>
      </div>
    </>
  )
}

export default Account


