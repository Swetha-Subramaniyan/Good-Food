import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PaginationControls from "./PaginationControls";
import ParentPlanModal from "./ParentPlanModal";
import { useSidebar } from "../../Sidebar/SidebarContext";


const ParentPlansManagement = () => {

  const { isOpen } = useSidebar();

  
  const [parentPlans, setParentPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

  const fetchParentPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/parentplan/getplan`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParentPlans(response.data);
      setFilteredPlans(response.data);
      setPagination((prev) => ({
        ...prev,
        totalEntries: response.data.length,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching parent plans:", error);
      toast.error("Failed to load parent plans");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentPlans();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPlans(parentPlans);
      setPagination((prev) => ({
        ...prev,
        totalEntries: parentPlans.length,
        currentPage: 1,
      }));
    } else {
      const filtered = parentPlans.filter(
        (plan) =>
          plan.plan_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.id.toString().includes(searchTerm)
      );
      setFilteredPlans(filtered);
      setPagination((prev) => ({
        ...prev,
        totalEntries: filtered.length,
        currentPage: 1,
      }));
    }
  }, [searchTerm, parentPlans]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredPlans;

    return [...filteredPlans].sort((a, b) => {
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
    setEditingPlan(null);
    setShowModal(true);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this parent plan?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/parentplan/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Parent plan deleted successfully");
        fetchParentPlans();
      } catch (error) {
        console.error("Error deleting parent plan:", error);
        toast.error("Failed to delete parent plan");
      }
    }
  };

  const handleSubmit = async (planData) => {
    try {
      const token = localStorage.getItem("token");
      if (editingPlan) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/parentplan/${editingPlan.id}`,
          planData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Parent plan updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/parentplan/createplan`,
          planData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Parent plan created successfully!");
      }
      fetchParentPlans();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving parent plan:", error);
      toast.error(`Failed to ${editingPlan ? "update" : "create"} parent plan`);
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
          <h2>Parent Plans Management</h2>
          <div className="add--button">
            <button onClick={handleCreate}>
              <AddIcon /> Add Parent Plan
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
              placeholder="Search parent plans..."
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
                  onClick={() => requestSort("plan_name")}
                >
                  Plan Name {getSortIcon("plan_name")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.id}</td>
                  <td>{plan.plan_name}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(plan)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(plan.id)}
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
          <ParentPlanModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            initialData={editingPlan}
          />
        )}
      </div>
    </div>
  );
};

export default ParentPlansManagement;
