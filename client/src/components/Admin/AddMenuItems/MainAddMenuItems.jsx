import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import MainSidebar from '../AdminSidebar/MainSidebar';
import './MainAddMenuItems.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewFoodItemModal = ({ onClose, onSuccess, mealTypeId }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_type: 'Veg',
    description: '',
    price: '',
    image_url: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/createFoodItem`,
        {
          ...formData,
          price: parseFloat(formData.price)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Food item created successfully!');
      onSuccess(response.data); 
      onClose();
    } catch (error) {
      toast.error('Failed to create food item');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Food Item</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Item Name:
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange}
              required
            />
          </label>
          
          <label>
            Item Type:
            <select
              name="item_type"
              value={formData.item_type}
              onChange={handleInputChange}
              required
            >
              <option value="Veg">Vegetarian</option>
              <option value="Non_Veg">Non-Vegetarian</option>
            </select>
          </label>
          
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </label>
          
          <label>
            Image URL:
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
            />
          </label>
          
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MainAddMenuItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [showNewFoodModal, setShowNewFoodModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state?.subscriptionData) {
      setSubscriptionData(location.state.subscriptionData);
      fetchAllFoodItems();
    } else {
      navigate('/admin/addsubscription');
    }
  }, [location, navigate]);

  const fetchAllFoodItems = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/getFoodItem`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error('Failed to load food items');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFoodItemSelection = (foodItemId) => {
    setSelectedItems(prev => {
      if (prev.includes(foodItemId)) {
        return prev.filter(id => id !== foodItemId);
      } else {
        return [...prev, foodItemId];
      }
    });
  };

  const handleNewFoodItemCreated = (newItem) => {
    setAllFoodItems(prev => [...prev, newItem]);
    setSelectedItems(prev => [...prev, newItem.id]);
  };

  const handleFinalSubmit = async () => {
    if (selectedItems.length === 0) {
      toast.warning('Please select at least one food item');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/with-food`,
        {
          ...subscriptionData,
          food_items: selectedItems
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Subscription plan created successfully!');
      navigate('/admin/subscriptions');
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast.error('Failed to create subscription plan');
    }
  };

  if (!subscriptionData || isLoading) return <div>Loading...</div>;

  return (
    <>
      <MainSidebar />
      <div className="add-menu-container">
        <h2>Add Food Items to Subscription Plan</h2>
        <p>Meal Type: {subscriptionData.meal_type_id}</p>
        
        <div className="food-actions">
          <button 
            className="add-new-food-btn"
            onClick={() => setShowNewFoodModal(true)}
          >
            + Add New Food Item
          </button>
        </div>
        
        <div className="food-items-grid">
          {allFoodItems.map(item => (
            <div 
              key={item.id} 
              className={`food-item-card ${selectedItems.includes(item.id) ? 'selected' : ''}`}
              onClick={() => toggleFoodItemSelection(item.id)}
            >
              {item.image_url && (
                <div className="food-item-image">
                  <img src={item.image_url} alt={item.item_name} />
                </div>
              )}
              <h3>{item.item_name}</h3>
              <p>Type: {item.item_type}</p>
              <p>Price: ₹{item.SubscriptionPriceDetails?.price || 'N/A'}</p>
              <p className="food-description">{item.description}</p>
            </div>
          ))}
          
          {allFoodItems.length === 0 && (
            <div className="no-items-message">
              <p>No food items found. Please create new ones.</p>
            </div>
          )}
        </div>
        
        <div className="menu-submit-buttons">
          <button onClick={() => navigate('/admin/addsubscription')}>Back</button>
          <button onClick={handleFinalSubmit}>Save Subscription</button>
        </div>
      </div>
      
      {showNewFoodModal && (
        <NewFoodItemModal 
          onClose={() => setShowNewFoodModal(false)}
          onSuccess={handleNewFoodItemCreated}
          mealTypeId={subscriptionData.meal_type_id}
        />
      )}
    </>
  );
};

export default MainAddMenuItems;