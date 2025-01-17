
import React from 'react';
import './SignIn.css'; 

const SignIn = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleGoogleSignIn = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER_URL;

    if (!backendUrl) {
      console.error('Backend URL is not set in environment variables.');
      alert('Configuration error: Backend URL is missing.');
      return;
    }

    try {
      window.location.href = `${backendUrl}/auth/google`;
    } catch (error) {
      console.error('Error redirecting to Google Sign-In:', error);
      alert('Failed to redirect to Google authentication.');
    }
  };



  return (
    <div className='sign-in-modal'>
      <div className='sign-in-content'>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Sign In</h2>
        <div className='sign-google'> 
        <button onClick={handleGoogleSignIn} > SignIn with Google </button>  </div>
        {/* <div style={{marginTop:'1rem'}}> (OR) </div>
        <form>       
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Enter your password" />
          </div>

         <div className='sign-button'> 
          <button type="submit"> Submit </button> </div>
         
        </form> */}
      </div>
    </div>
  );
};

export default SignIn;
