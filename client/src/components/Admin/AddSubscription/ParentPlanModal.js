import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ParentPlanModal = ({ onClose, onSubmit, initialData }) => {
  const [planName, setPlanName] = useState("");

  useEffect(() => {
    if (initialData) {
      setPlanName(initialData.plan_name);
    }else{
      setPlanName("")
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ plan_name: planName });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>{initialData ? "Edit" : "Create New"} Parent Plan</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>Plan Name:</div>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
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

export default ParentPlanModal;