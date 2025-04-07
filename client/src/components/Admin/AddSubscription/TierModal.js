import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const TierModal = ({ onClose, onSubmit, initialData }) => {
  const [type, setType] = useState("");

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
    }else{
      setType("")
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>{initialData ? "Edit" : "Create New"} Tier</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>Tier Type:</div>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
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

export default TierModal;