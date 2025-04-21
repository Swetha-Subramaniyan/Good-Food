import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationControls from "../../Utils/PaginationControls";
import { useSidebar } from "../../Sidebar/SidebarContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";

const CancelledSubscriptions = () => {
  const { isOpen } = useSidebar();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });
  const [expandedSubscription, setExpandedSubscription] = useState(null);

  const fetchCancelledSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/cancel/cancelled-subscriptions`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: pagination.currentPage,
            limit: pagination.entriesPerPage,
            search: searchTerm,
          },
        }
      );
      
      setSubscriptions(response.data.data);
      setPagination(prev => ({
        ...prev,
        totalEntries: response.data.totalCount || 0
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cancelled subscriptions:", error);
      toast.error("Failed to load cancelled subscriptions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCancelledSubscriptions();
  }, [pagination.currentPage, pagination.entriesPerPage, searchTerm]);

  const handleStatusChange = async (subscriptionId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/cancelled-subscriptions/${subscriptionId}`,
        { status: newStatus, refund_status: newStatus === 'APPROVED' ? 'PENDING' : 'NONE' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated successfully");
      fetchCancelledSubscriptions();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const toggleExpandSubscription = (id) => {
    setExpandedSubscription(expandedSubscription === id ? null : id);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
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

  const totalPages = Math.ceil(
    pagination.totalEntries / pagination.entriesPerPage
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="management-container">
        <div className="management-header">
          <h2>Cancelled Subscriptions</h2>
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
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by plan, user or email..."
            />
          </div>
        </div>

        <div className="management-table-container">
          <table className="management-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("user.name")}>
                  User {getSortIcon("user.name")}
                </th>
                <th onClick={() => requestSort("plan.plan_details.Subscription.parentPlan1.plan_name")}>
                  Plan {getSortIcon("plan.plan_details.Subscription.parentPlan1.plan_name")}
                </th>
                <th>Food Items</th>
                <th onClick={() => requestSort("plan.duration")}>
                  Duration {getSortIcon("plan.duration")}
                </th>
                <th onClick={() => requestSort("dates.start")}>
                  Dates {getSortIcon("dates.start")}
                </th>
                <th>Cancellation Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <React.Fragment key={sub.id}>
                  <tr>
                    <td>
                      <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar style={{ marginRight: '10px', backgroundColor: '#3f51b5' }}>
                          {sub.user.name.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="user-name">{sub.user.name}</div>
                          <div className="user-email">{sub.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="plan-info">
                        <div>{sub.plan.plan_details.Subscription.parentPlan1.plan_name}</div>
                      </div>
                    </td>
                    <td>
                      <button 
                        onClick={() => toggleExpandSubscription(sub.id)}
                        className="food-items-toggle"
                      >
                        {expandedSubscription === sub.id ? 'Hide Items' : 'Show Items'}
                      </button>
                    </td>
                    <td>{sub.plan.duration} days</td>
                    <td>
                      <div className="date-info">
                        <div>{new Date(sub.dates.start).toLocaleDateString()}</div>
                        <div>{new Date(sub.dates.end).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="reason-cell">
                      {sub.cancellation?.reason || "N/A"}
                    </td>
                    <td>
                      <select
                        value={sub.cancellation?.status ? "APPROVED" : "PENDING"}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                        className={`status-select ${
                          sub.cancellation?.status ? "approved" : "pending"
                        }`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                      </select>
                    </td>
                  </tr>
                  {expandedSubscription === sub.id && (
                    <tr className="food-items-details">
                      <td colSpan="7">
                        <div className="food-items-container">
                          <h4>Food Items in this Plan:</h4>
                          <div className="food-items-grid">
                            {sub.plan.plan_details.Subscription.FoodSubscription.map((foodSub) => (
                              <div key={foodSub.id} className="food-item-card">
                                <div className="food-item-name">{foodSub.FoodItems.item_name}</div>
                                <div className="food-item-type">{foodSub.FoodItems.item_type}</div>
                                <div className="food-item-description">{foodSub.FoodItems.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
      </div>
    </div>
  );
};

export default CancelledSubscriptions;