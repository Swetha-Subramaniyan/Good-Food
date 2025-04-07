import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const QuantityModal = ({ onClose, onSubmit, initialData }) => {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuantity(initialData.quantity);
    }else{
      setQuantity("")
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ quantity: parseInt(quantity) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>{initialData ? "Edit" : "Create New"} Quantity</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>Quantity:</div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">{initialData ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuantityModal;