import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./MainAddSubscription.css"

const FoodItemModal = ({ onClose, onSubmit, initialData }) => {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("Veg");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setItemName(initialData.item_name);
      setItemType(initialData.item_type);
      setDescription(initialData.description || "");
      setPrice(initialData.SubscriptionPriceDetails?.price?.toString() || "");
      if (initialData.image_url) {
        setPreviewImage(getImage(initialData.image_url));
      }
    } else {
      setItemName("");
      setItemType("Veg");
      setDescription("");
      setPrice("");
      setPreviewImage("");
      setSelectedFile(null);
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("item_type", itemType);
    formData.append("description", description);
    formData.append("price", price);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (initialData && !selectedFile && initialData.image_url) {
      formData.append("image_url", initialData.image_url);
    }

    onSubmit(formData);
  };

  const getImage = (imageName) => {
    try {
      const images = require.context("../../../assets", true);
      return images(`./${imageName}`);
    } catch (e) {
      console.error(`Error loading image ${imageName}:`, e);
      return require("../../../assets/idly.jpg").default; 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>{initialData ? "Edit" : "Create New"} Food Item</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>Item Name:</div>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </label>

          <label>
            <div>Item Type:</div>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              required
            >
              <option value="Veg">Vegetarian</option>
              <option value="Non_Veg">Non-Vegetarian</option>
            </select>
          </label>

          <label>
            <div>Description:</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </label>

          <label>
            <div>Price (₹):</div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </label>

          <label>
            <div>Item Image:</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!initialData}
            />
          </label>
          {previewImage && (
            <div className="image-view">
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}

          <div className="modal-buttons">
            <button type="submit">{initialData ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodItemModal;
