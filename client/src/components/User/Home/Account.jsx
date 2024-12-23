import React from 'react'
import './Account.css'

const Account = () => {
  return (
    <> 
   
    <h2 style={{marginTop:'2.5rem'}}> My Profile </h2>
    <div className='form-container'> 
    <div className='profile-form'> 
    
             <div className="form-group">
              <label>Name</label>
              <input type="text" required />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input type="email" required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" required />
            </div>

            <div className="form-group">
              <label>Delivery Address 1</label>
              <textarea required />
            </div>
            <div className="form-group">
              <label>Street / LandMark</label>
              <input type='text' required/>
            </div>
            <div className="form-group">
              <label>City</label>
              <input type='text' required/>
            </div>
            <div className="form-group">
              <label>Delivery Address 2</label>
              <textarea />
            </div>
            <div className="form-group">
              <label>Street / LandMark</label>
              <input type='text' required/>
            </div>
            <div className="form-group">
              <label>Area</label>
              <input type='text' required/>
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input type='text' required/>
            </div>
            <div className="form-group">
              <label>Subscription Plan</label>
              <input/>
            </div>
            <div className="form-group">
              <label>Subscription Days</label>
              <input/>
            </div>
            <div className="form-group">
              <label>Payment Method </label>
              <input/>
            </div>
            <div className="form-group">
              <label >Refer Your Friend and Get Discount</label>
              
            </div>
            <div className='form-edit-save'> 
                <button> Edit </button> <button> Save</button>
            </div>

            </div>
    </div>
   
    </>
  )
}

export default Account
