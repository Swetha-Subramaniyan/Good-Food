// import React from 'react';
// import { BsSearch } from "react-icons/bs";
// import './MainHome.css'
// import MainNavbar from '../Navbar/MainNavbar';
// import { IoSunnyOutline } from "react-icons/io5";
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import { MdOutlineModeNight } from "react-icons/md";
// import idly from '../../../assets/idly.jpg'
// import rice from '../../../assets/Rice.jpg'
// import biriyani from '../../../assets/biriya.jpg'
// import chappathi from '../../../assets/chappathi.jpg'
// import pongal from '../../../assets/pongal.jpg'
// import StarRatings from './StarRatings';
// import Footer from './Footer';
// import { useState } from 'react';
// import { ImSpoonKnife } from "react-icons/im";
// import {  useNavigate } from 'react-router-dom';


// const MainHome = () => {

//   const [addedItems, setAddedItems] = useState({
//     idly: false,
//     pongal: false,
//     rice: false,
//     biriyani: false,
//     chappathi: false,
//   });

//   const navigate= useNavigate()
//   const addonMenu=()=>{
//     navigate ('/user/MenuAddon')
//   }

//   const handleAddClick = (item) => {
//     setAddedItems(prevState => ({
//       ...prevState,
//       [item]: !prevState[item], 
//     }));
//   };

//   return (
//     <> 
//   <MainNavbar/>
  
//  <div className='search'>  
//  <input placeholder='Search'/> 
//  {/* <span> <BsSearch size={25}/> </span> */}
//   </div>

//   <div className='break'> 
//             <div className='breakfast-out'> <IoPartlySunnyOutline/><span className='fast'> Breakfast </span>  <br/> Order before 11:00AM </div>
//             <div className='breakfast-out'> <IoSunnyOutline /><span className='fast'> Lunch </span>  <br/> Order before 3:00AM  </div>
//             <div className='breakfast-out'>  <MdOutlineModeNight /> <span className='fast'> Dinner </span>  <br/> Order before 7:00PM </div>  
//             <div onClick={addonMenu} className='breakfast-out'>  <ImSpoonKnife /> <span className='fast'> Menu </span> <br/> Additional Charge </div>          
//   </div>

//   <div className='photo'> 
//   <div> 
//     <img src={idly} alt='idly'/><br/> 
//     <h4> Idly+chutney+sambar <br/> <StarRatings/></h4>
//     <div className='add'> 
//     {/* <span> + </span>
//     <button > Add</button> <span> - </span>  */}
//     <button> Add</button>
    
//     </div>
//   </div>
//   <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h4> Rice + Chicken gravy <br/>  <StarRatings/></h4>
//     <div className='add'> 
//    <button  > Add </button> </div> 
//   </div>
//   <div> 
//     <img src={biriyani} alt='dosa'/><br/> 
//     <h4> Chicken Biriyani <br/>  <StarRatings/></h4>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h4>Rice + Chicken gravy <br/>  <StarRatings/></h4>
//     <div className='add'> 
//    <button  > Add </button> </div> 
//   </div>

//   <div> 
//     <img src={chappathi} alt='idly'/><br/> 
//     <h4> Chappathi  <br/>  <StarRatings /></h4>
//     <div className='add'> 
//     {/* <button> Add</button> */}

//     <button onClick={() => handleAddClick('chappathi')}> 
//               {addedItems.chappathi ? 'Added' : 'Add'} 
//               {addedItems.chappathi && '+'} 
//     </button>   

//      </div> 
//     </div>
//   </div>
//   <div> <Footer/></div>

//     </>
//   )
// }

// export default MainHome










import React, { useState, useEffect } from 'react';
import './MainHome.css';
import MainNavbar from '../Navbar/MainNavbar';
import { IoSunnyOutline } from "react-icons/io5";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";
import idly from '../../../assets/idly.jpg';
import rice from '../../../assets/Rice.jpg';
import biriyani from '../../../assets/biriya.jpg';
import chappathi from '../../../assets/chappathi.jpg';
import pongal from '../../../assets/pongal.jpg';
import StarRatings from './StarRatings';
import Footer from './Footer';
import { ImSpoonKnife } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const MainHome = () => {
  const [addedItems, setAddedItems] = useState({
    idly: 0,
    pongal: 0,
    rice: 0,
    biriyani: 0,
    chappathi: 0,
  });

  const navigate = useNavigate();

  const addonMenu = () => {
    navigate('/user/MenuAddon');
  };

  const items = [
    { name: 'idly', image: idly, description: 'Idly+chutney+sambar', price: 30 },
    { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', price: 40 },
    { name: 'rice', image: rice, description: 'Rice + Chicken gravy', price: 50 },
    { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani', price: 60 },
    { name: 'chappathi', image: chappathi, description: 'Chappathi', price: 20 },
    { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani', price: 60 },
    { name: 'rice', image: rice, description: 'Rice + Chicken gravy', price: 50 },
    
  ];

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialState = {};
    items.forEach(item => {
      const storedItem = storedItems.find(stored => stored.name === item.name);
      initialState[item.name] = storedItem ? storedItem.quantity : 0;
    });
    setAddedItems(initialState);
  }, []);


  const handleQuantityChange = (item, operation) => {
    setAddedItems((prevState) => {
      const newQuantity = operation === 'increment'
        ? prevState[item] + 1
        : prevState[item] > 0
        ? prevState[item] - 1
        : 0;
  
      let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let updatedItems = storedItems.map(cartItem => {
        if (cartItem.name === item) {
          return { ...cartItem, quantity: newQuantity, totalPrice: newQuantity * cartItem.price };
        }
        return cartItem;
      }).filter(cartItem => cartItem.quantity > 0);
  
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  
      return { ...prevState, [item]: newQuantity };
    });
  };
  

  const handleAddToCart = (item) => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = storedItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
   
      storedItems.push({ ...item, quantity: 1, totalPrice: item.price });
    }
   
    localStorage.setItem('cartItems', JSON.stringify(storedItems));

    setAddedItems((prevState) => ({
      ...prevState,
      [item.name]: prevState[item.name] + 1,
    }));
  };

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <>
      <MainNavbar />

      <div className='search'>
        <input placeholder='Search' />
      </div>

      <div className='break'>
        <div className='breakfast-out'>
          <IoPartlySunnyOutline /><span className='fast'> Breakfast </span> <br /> Order before 11:00AM
        </div>
        <div className='breakfast-out'>
          <IoSunnyOutline /><span className='fast'> Lunch </span>  <br /> Order before 3:00AM
        </div>
        <div className='breakfast-out'>
          <MdOutlineModeNight /> <span className='fast'> Dinner </span>  <br /> Order before 7:00PM
        </div>
        <div onClick={addonMenu} className='breakfast-out'>
          <ImSpoonKnife /> <span className='fast'> Menu </span> <br /> Additional Charge
        </div>
      </div>
      <div className='photo'>
        {items.map((item, index) => (
          <div key={item.name}>             
            <div className='days-align'>{daysOfWeek[index % daysOfWeek.length]}</div>
            <br/>                            
            <img src={item.image} alt={item.name} /><br />
            <h4>{item.description} <br /> <StarRatings /></h4>               
            <div className='add'>
              {addedItems[item.name] > 0 ? (
                <div className="quantity-container">
                  <button onClick={() => handleQuantityChange(item.name, 'decrement')}>-</button>
                  <span>{addedItems[item.name]}</span>
                  <button onClick={() => handleQuantityChange(item.name, 'increment')}>+</button>
                </div>
              ) : (
                <button onClick={() => handleAddToCart(item)}>Add</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MainHome;
