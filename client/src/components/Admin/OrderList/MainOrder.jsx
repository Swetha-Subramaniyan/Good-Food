

import React, { useState } from 'react';
import MainSidebar from '../AdminSidebar/MainSidebar';
import './MainOrder.css';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MainOrder = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('Delivered');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div><MainSidebar /></div>
      <h2 style={{fontWeight:'bold'}} > Order List</h2>
      <div className='chef-admin-orders'> 
      <Link to={'/admin/cheforderlist'}> 
      <div className='Chef-order'> Chef Orders List</div></Link>
      <Link to={'/admin/adminorderlist'}> 
      <div className='Chef-order' > Admin Orders List </div></Link> 
      </div>
      <div className='date-header'>
        <h5>Date: 21-01-2024</h5>
      </div>
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dhanusha</td>
              <td>
                <FaEye onClick={toggleModal} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modall">
          <div className="modal-contentt">
            <button className="closee" onClick={toggleModal}>X</button>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pic</td>
                  <td>Chicken Biriyani</td>
                  <td>₹250</td>
                  <td>1</td>
                  <td> 
                  <select value={status} onChange={handleStatusChange}>
                      <option value="Delivered">Delivered</option>
                      <option value="Food Processing">Food Processing</option>
                    </select>
                    </td>
                  
                </tr>
              </tbody>
            </table>
            <div className='user-details'> 
            <h5> Name: Dhanusha R</h5>
            <h5> Phone Number: 9361884122</h5>
            <h5>Address: 1/234,Saravanampatti, Coimbatore - 567890</h5>
            </div>
            <div className='submit-share'> 
            <button> Submit </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default MainOrder;
