import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationControls from "../../Utils/PaginationControls";
import QuantityModal from "./QuantityModal";
import { useSidebar } from "../../Sidebar/SidebarContext";

const QuantitiesManagement = () => {

  const { isOpen } = useSidebar();


  const [quantities, setQuantities] = useState([]);
  const [filteredQuantities, setFilteredQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0
  });

  const fetchQuantities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/quantity/getquantity`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuantities(response.data);
      setFilteredQuantities(response.data);
      setPagination(prev => ({ ...prev, totalEntries: response.data.length }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quantities:", error);
      toast.error("Failed to load quantities");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuantities();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredQuantities(quantities);
      setPagination(prev => ({ ...prev, totalEntries: quantities.length, currentPage: 1 }));
    } else {
      const filtered = quantities.filter(quantity => 
        quantity.quantity.toString().includes(searchTerm) ||
        quantity.id.toString().includes(searchTerm)
      );
      setFilteredQuantities(filtered);
      setPagination(prev => ({ ...prev, totalEntries: filtered.length, currentPage: 1 }));
    }
  }, [searchTerm, quantities]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredQuantities;
    
    return [...filteredQuantities].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleEntriesPerPageChange = (size) => {
    setPagination(prev => ({ ...prev, entriesPerPage: size, currentPage: 1 }));
  };

  const getPaginatedData = () => {
    const sortedData = getSortedData();
    const { currentPage, entriesPerPage } = pagination;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  const handleCreate = () => {
    setEditingQuantity(null);
    setShowModal(true);
  };

  const handleEdit = (quantity) => {
    setEditingQuantity(quantity);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quantity?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/quantity/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Quantity deleted successfully");
        fetchQuantities();
      } catch (error) {
        console.error("Error deleting quantity:", error);
        toast.error("Failed to delete quantity");
      }
    }
  };

  const handleSubmit = async (quantityData) => {
    try {
      const token = localStorage.getItem("token");
      if (editingQuantity) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/quantity/${editingQuantity.id}`,
          quantityData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Quantity updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/quantity/craetequantity`,
          quantityData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Quantity created successfully!");
      }
      fetchQuantities();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving quantity:", error);
      toast.error(`Failed to ${editingQuantity ? 'update' : 'create'} quantity`);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ArrowUpwardIcon fontSize="small" /> : 
      <ArrowDownwardIcon fontSize="small" />;
  };

  const totalPages = Math.ceil(pagination.totalEntries / pagination.entriesPerPage);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
    <div className="management-container">
      <div className="management-header">
        <h2>Quantities Management</h2>
        <div className="add--button">
          <button onClick={handleCreate}>
            <AddIcon /> Add Quantity
          </button>
        </div>
      </div>

      <div className="pagination-header">
        <div className="entries-per-page">
          <span>Show:</span>
          <select 
            value={pagination.entriesPerPage} 
            onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50, 100, 200].map(size => (
              <option key={size} value={size}>{size}</option>
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
            placeholder="Search quantities..."
          />
        </div>
      </div>

      <div className="management-table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th className="sortable-header" onClick={() => requestSort('id')}>
                ID {getSortIcon('id')}
              </th>
              <th className="sortable-header" onClick={() => requestSort('quantity')}>
                Quantity {getSortIcon('quantity')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((quantity) => (
              <tr key={quantity.id}>
                <td>{quantity.id}</td>
                <td>{quantity.quantity}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(quantity)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(quantity.id)}
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
        <QuantityModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          initialData={editingQuantity}
        />
      )}
    </div>
    </div>
  );
};

export default QuantitiesManagement;