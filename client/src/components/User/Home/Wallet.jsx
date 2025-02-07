import React from 'react'
import './Wallet.css'

const Wallet = () => {
  return (
    <> 
    
    <div className='wallet'> 
    <h2 style={{marginTop:'2rem'}}> Wallet </h2>
    </div>
    <div className='wallet-container'> 
    <div> 
        <h4> Refunded Price   <input/>  </h4>     
    </div>
    <div> 
        <h4> Reason 
          <br/> <br/>
           <textarea/> </h4> 
           {/* <img src=''> </img> */}
    </div>
    </div>
    </>
  )
}

export default Wallet