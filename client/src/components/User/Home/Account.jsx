import React from 'react'
import './Account.css'

const Account = () => {
  return (
    <> 
    <div className='form-container'> 
    <h2> My Profile </h2>
    
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
              <label>City</label>
              <input type='text' required/>
            </div>
            <div className="form-group">
              <label>Subscription Plan</label>
              <input/>
            </div>
            <div className="form-group">
              <label>Payment Type </label>
              <input/>
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
