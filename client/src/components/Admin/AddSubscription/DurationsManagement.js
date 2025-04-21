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
import DurationModal from "./DurationModal";
import { useSidebar } from "../../Sidebar/SidebarContext";


const DurationsManagement = () => {
  const { isOpen } = useSidebar();


  const [durations, setDurations] = useState([]);
  const [filteredDurations, setFilteredDurations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDuration, setEditingDuration] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

  const fetchDurations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/getduration`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDurations(response.data);
      setFilteredDurations(response.data);
      setPagination((prev) => ({
        ...prev,
        totalEntries: response.data.length,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching durations:", error);
      toast.error("Failed to load durations");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDurations();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredDurations(durations);
      setPagination((prev) => ({
        ...prev,
        totalEntries: durations.length,
        currentPage: 1,
      }));
    } else {
      const filtered = durations.filter(
        (duration) =>
          duration.actual_days.toString().includes(searchTerm) ||
          duration.addon_days.toString().includes(searchTerm) ||
          duration.id.toString().includes(searchTerm)
      );
      setFilteredDurations(filtered);
      setPagination((prev) => ({
        ...prev,
        totalEntries: filtered.length,
        currentPage: 1,
      }));
    }
  }, [searchTerm, durations]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredDurations;

    return [...filteredDurations].sort((a, b) => {
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
    setEditingDuration(null);
    setShowModal(true);
  };

  const handleEdit = (duration) => {
    setEditingDuration(duration);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this duration?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Duration deleted successfully");
        fetchDurations();
      } catch (error) {
        console.error("Error deleting duration:", error);
        toast.error("Failed to delete duration");
      }
    }
  };

  const handleSubmit = async (durationData) => {
    try {
      const token = localStorage.getItem("token");
      if (editingDuration) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/${editingDuration.id}`,
          durationData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Duration updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/createduration`,
          durationData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Duration created successfully!");
      }
      fetchDurations();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving duration:", error);
      toast.error(
        `Failed to ${editingDuration ? "update" : "create"} duration`
      );
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
          <h2>Durations Management</h2>
          <div className="add--button">
            <button onClick={handleCreate}>
              <AddIcon /> Add Duration
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
              placeholder="Search durations..."
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
                  onClick={() => requestSort("actual_days")}
                >
                  Actual Days {getSortIcon("actual_days")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("addon_days")}
                >
                  Addon Days {getSortIcon("addon_days")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((duration) => (
                <tr key={duration.id}>
                  <td>{duration.id}</td>
                  <td>{duration.actual_days}</td>
                  <td>{duration.addon_days}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(duration)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(duration.id)}
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
          <DurationModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            initialData={editingDuration}
          />
        )}
      </div>
    </div>
  );
};

export default DurationsManagement;
