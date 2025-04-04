import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const DurationModal = ({ onClose, onSubmit, initialData }) => {
  const [actualDays, setActualDays] = useState("");
  const [addonDays, setAddonDays] = useState("");

  useEffect(() => {
    if (initialData) {
      setActualDays(initialData.actual_days);
      setAddonDays(initialData.addon_days);
    }
    else {
      setActualDays("");
      setAddonDays("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      actual_days: parseInt(actualDays), 
      addon_days: parseInt(addonDays) 
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>{initialData ? "Edit" : "Create New"} Duration</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>Actual Days:</div>
            <input
              type="number"
              value={actualDays}
              onChange={(e) => setActualDays(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Addon Days:</div>
            <input
              type="number"
              value={addonDays}
              onChange={(e) => setAddonDays(e.target.value)}
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

export default DurationModal;