import React from "react";
import "./Update.css"; 

const Update = ({ onClose }) => {
  return (
    <div className="update-popup">
      <div className="update-content">
        <h2>Update Details</h2>
        <p>This is your update component content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Update;
