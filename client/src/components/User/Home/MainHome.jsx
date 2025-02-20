import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MainHome.css';
import MainNavbar from '../Navbar/MainNavbar';
import { IoSunnyOutline } from "react-icons/io5";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";

import { ImSpoonKnife } from "react-icons/im";
import { useNavigate, useParams } from 'react-router-dom';

 
 
const MainHome = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [additionalItems, setAdditionalItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams(); 
  const [cart, setCart] = useState([]); 
  const [subscriptionId, setSubscriptionId] = useState(null); 
  const navigate=useNavigate();

 

    useEffect(() => {
    const fetchFoodMenu = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getFoodWithID/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("SUB DETAILS:", response.data);

        const subId = response.data.getFood[0]?.subscription_id || null;
        setSubscriptionId(subId); 

        const foodData = response.data.getFood[0]?.Subscription?.FoodSubscription?.flatMap(
          (foodSub) => foodSub.FoodItems
        );

        if (foodData) {
          setFoodItems(foodData); 
        }
      } catch (error) {
        console.error('Error fetching food menu:', error);
      }
    };

    fetchFoodMenu();
  }, [id]);

  useEffect(() => {
    const fetchAdditionalItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Additional Items:", response.data.foodItems);
        setAdditionalItems(response.data.foodItems); 
      } catch (error) {
        console.error('Error fetching additional items:', error);
      }
    };

    fetchAdditionalItems();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);
 
  const handleAddItem = async (item) => {
    if (!subscriptionId) {
      console.error("Subscription ID not found!");
      return;
    }
  
    const updatedCart = [...cart, { ...item, item_name: item.item_name || item.name }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/cart/newCart`,
        {
          subscription_id: subscriptionId, 
          food_item_id: item.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Item added to backend cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  

  const handleRemoveItem = (item) => {
    const updatedCart = cart.filter((cartItem, index) =>
      cartItem.item_name !== (item.item_name || item.name) || 
      index !== cart.findIndex(cart => cart.item_name === (item.item_name || item.name))
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToCart = () => {
    navigate('/cart');
  };
 
  return (
    <>

      <MainNavbar />
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button onClick={goToCart} className="cart-button">Go to Cart</button>

      <div className='break'>
        <div className='breakfast-out'>
          <IoPartlySunnyOutline /><span className='fast'> Breakfast </span> <br /> Order before 11:00AM
        </div>
        <div className='breakfast-out'>
          <IoSunnyOutline /><span className='fast'> Lunch </span>  <br /> Order before 3:00PM
        </div>
        <div className='breakfast-out'>
          <MdOutlineModeNight /> <span className='fast'> Dinner </span>  <br /> Order before 7:00PM
        </div>
        <div  className='breakfast-out'>
          <ImSpoonKnife /> <span className='fast'> Menu </span> <br /> Additional Charge
        </div>
      </div>
 
       <div className='photo'>
        
       <div className="food-items">
        <h2>Your Food Items</h2>
        {foodItems.length > 0 ? (
          <div className="food-items-container">
            {foodItems
              .filter((item) =>
                item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="food-item">
                  <span>{item.item_name}</span>
                  <div className="food-item-actions">
                    <button onClick={() => handleRemoveItem(item)}>-</button>
                    <span>{cart.filter((cartItem) => cartItem.item_name === item.item_name).length}</span>
                    <button onClick={() => handleAddItem(item)}>+</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No food items found for your subscription.</p>
        )}
      </div>
        
      </div>
 
      <div className='choose-menu'> Choose more Delicious Foods </div>
      <div className="additional-items">
        <h2>Additional Items</h2>
        {additionalItems.length > 0 ? (
          <div className="food-items-container">
            {additionalItems.map((item, index) => (
              <div key={index} className="food-item">
                <span>{item.name}</span>
                <div className="food-item-actions">
                  <button onClick={() => handleRemoveItem(item)}>-</button>
                  <span>
                  {cart.filter((cartItem) => cartItem.item_name === (item.item_name || item.name)).length}
                  </span>
                  <button onClick={() => handleAddItem(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No additional items available.</p>
        )}
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
 
    </>
  );
};
 
export default MainHome;

