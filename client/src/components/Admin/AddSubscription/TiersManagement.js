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
import TierModal from "./TierModal";
import { useSidebar } from "../../Sidebar/SidebarContext";


const TiersManagement = () => {
  const { isOpen } = useSidebar();

  const [tiers, setTiers] = useState([]);
  const [filteredTiers, setFilteredTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

  const fetchTiers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/tier/gettier`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTiers(response.data);
      setFilteredTiers(response.data);
      setPagination((prev) => ({
        ...prev,
        totalEntries: response.data.length,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tiers:", error);
      toast.error("Failed to load tiers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTiers(tiers);
      setPagination((prev) => ({
        ...prev,
        totalEntries: tiers.length,
        currentPage: 1,
      }));
    } else {
      const filtered = tiers.filter(
        (tier) =>
          tier.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tier.id.toString().includes(searchTerm)
      );
      setFilteredTiers(filtered);
      setPagination((prev) => ({
        ...prev,
        totalEntries: filtered.length,
        currentPage: 1,
      }));
    }
  }, [searchTerm, tiers]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredTiers;

    return [...filteredTiers].sort((a, b) => {
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
    setEditingTier(null);
    setShowModal(true);
  };

  const handleEdit = (tier) => {
    setEditingTier(tier);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/tier/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Tier deleted successfully");
        fetchTiers();
      } catch (error) {
        console.error("Error deleting tier:", error);
        toast.error("Failed to delete tier");
      }
    }
  };

  const handleSubmit = async (tierData) => {
    try {
      const token = localStorage.getItem("token");
      if (editingTier) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/tier/${editingTier.id}`,
          tierData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Tier updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/tier/createtier`,
          tierData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Tier created successfully!");
      }
      fetchTiers();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving tier:", error);
      toast.error(`Failed to ${editingTier ? "update" : "create"} tier`);
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="management-container">
        <div className="management-header">
          <h2>Tiers Management</h2>
          <div className="add--button">
            <button onClick={handleCreate}>
              <AddIcon /> Add Tier
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
              placeholder="Search tiers..."
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
                  onClick={() => requestSort("type")}
                >
                  Type {getSortIcon("type")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((tier) => (
                <tr key={tier.id}>
                  <td>{tier.id}</td>
                  <td>{tier.type}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(tier)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(tier.id)}
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
          <TierModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            initialData={editingTier}
          />
        )}
      </div>
    </div>
  );
};

export default TiersManagement;
