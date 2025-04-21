import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PaginationControls from "../../Utils/PaginationControls";
import FoodItemModal from "./FoodItemModal";
import idlyImage from "../../../assets/idly.jpg";
import { useSidebar } from "../../Sidebar/SidebarContext";


const FoodItemsManagement = () => {
  const { isOpen } = useSidebar();
  
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

  const fetchFoodItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/getfooditem`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("food", response);
      setFoodItems(response.data);
      setFilteredItems(response.data);
      setPagination((prev) => ({
        ...prev,
        totalEntries: response.data.length,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("Failed to load food items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredItems(foodItems);
      setPagination((prev) => ({
        ...prev,
        totalEntries: foodItems.length,
        currentPage: 1,
      }));
    } else {
      const filtered = foodItems.filter(
        (item) =>
          item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.item_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toString().includes(searchTerm)
      );
      setFilteredItems(filtered);
      setPagination((prev) => ({
        ...prev,
        totalEntries: filtered.length,
        currentPage: 1,
      }));
    }
  }, [searchTerm, foodItems]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleEntriesPerPageChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      entriesPerPage: size,
      currentPage: 1,
    }));
  };

  const getPaginatedData = () => {
    const sortedData = getSortedData();
    const { currentPage, entriesPerPage } = pagination;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Food item deleted successfully");
        fetchFoodItems();
      } catch (error) {
        console.error("Error deleting food item:", error);
        toast.error("Failed to delete food item");
      }
    }
  };

  const handleSubmit = async (itemData) => {
    try {
      const token = localStorage.getItem("token");
      if (editingItem) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/${editingItem.id}`,
          itemData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Food item updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/createfooditem`,
          itemData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Food item created successfully!");
      }
      fetchFoodItems();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving food item:", error);
      toast.error(`Failed to ${editingItem ? "update" : "create"} food item`);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  const totalPages = Math.ceil(
    pagination.totalEntries / pagination.entriesPerPage
  );

  const getImage = (imageName) => {
    try {
      const images = require.context("../../../assets", true);
      return images(`./${imageName}`);
    } catch (e) {
      console.error(`Error loading image ${imageName}:`, e);
      return require("../../../assets/idly.jpg").default; 
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="management-container">
        <div className="management-header">
          <h2>Food Items Management</h2>
          <div className="add--button">
            <button onClick={handleCreate}>
              <AddIcon /> Add Food Item
            </button>
          </div>
        </div>

        <div className="pagination-header">
          <div className="entries-per-page">
            <span>Show:</span>
            <select
              value={pagination.entriesPerPage}
              onChange={(e) =>
                handleEntriesPerPageChange(Number(e.target.value))
              }
            >
              {[5, 10, 20, 50, 100, 200].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
          <div className="search-container">
            <label>Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search food items..."
            />
          </div>
        </div>

        <div className="management-table-container">
          <table className="management-table">
            <thead>
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("id")}
                >
                  ID {getSortIcon("id")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("item_name")}
                >
                  Item Name {getSortIcon("item_name")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("item_type")}
                >
                  Item Type {getSortIcon("item_type")}
                </th>
                <th>Image</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.item_name}</td>
                  <td>{item.item_type}</td>
                  <td>
                    <img
                      src={getImage(item.image_url)}
                      alt={item.item_name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = idlyImage;
                      }}
                    />
                  </td>
                  <td>{item.SubscriptionPriceDetails.price}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          entriesPerPage={pagination.entriesPerPage}
          totalEntries={pagination.totalEntries}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />

        {showModal && (
          <FoodItemModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            initialData={editingItem}
          />
        )}
      </div>
    </div>
  );
};

export default FoodItemsManagement;
