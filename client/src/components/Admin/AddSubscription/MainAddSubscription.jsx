import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainAddSubscription.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DurationModal from "./DurationModal";
import ParentPlanModal from "./ParentPlanModal";
import QuantityModal from "./QuantityModal";
import FoodItemModal from "./FoodItemModal";
import PaginationControls from "../../Utils/PaginationControls";
import { Checkbox, FormControlLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import { useSidebar } from "../../Sidebar/SidebarContext";


const MainAddSubscription = () => {

  const { isOpen } = useSidebar();

  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    parent_plan_id: "",
    plan_description: "",
    tier_id: "",
    duration_id: "",
    quantity_id: "",
    meal_type_id: "",
    price: "",
    food_items: [],
  });
  const [formOptions, setFormOptions] = useState({
    parentPlans: [],
    tiers: [],
    durations: [],
    quantities: [],
    mealTypes: [],
    fooditems: [],
  });
  const [activeModal, setActiveModal] = useState(null);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

  const token = localStorage.getItem("token");

  const fetchFormOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/form-data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormOptions(response.data);
    } catch (error) {
      console.error("Error fetching form options:", error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/getplan`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscriptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to load subscriptions");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Subscription deleted successfully");
        fetchSubscriptions();
      } catch (error) {
        console.error("Error deleting subscription:", error);
        toast.error("Failed to delete subscription");
      }
    }
  };

  useEffect(() => {
    fetchFormOptions();
    fetchSubscriptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value === "other") {
      switch (name) {
        case "parent_plan_id":
          setActiveModal("parentPlan");
          break;
        case "duration_id":
          setActiveModal("duration");
          break;
        case "quantity_id":
          setActiveModal("quantity");
          break;
        default:
          break;
      }
      setFormData((prev) => ({ ...prev, [name]: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFoodItemToggle = (foodItemId) => {
    setFormData((prev) => ({
      ...prev,
      food_items: prev.food_items.includes(foodItemId)
        ? prev.food_items.filter((id) => id !== foodItemId)
        : [...prev.food_items, foodItemId],
    }));
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleCreationSuccess = () => {
    fetchFormOptions();
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSubscriptions(subscriptions);
      setPagination((prev) => ({
        ...prev,
        totalEntries: subscriptions.length,
        currentPage: 1,
      }));
    } else {
      const filtered = subscriptions.filter((sub) => {
        const searchStr = searchTerm.toLowerCase();
        return (
          sub.id?.toString().includes(searchStr) ||
          sub.parentPlan1?.plan_name?.toLowerCase().includes(searchStr) ||
          sub.plan_description?.toLowerCase().includes(searchStr) ||
          sub.TierSub?.type?.toLowerCase().includes(searchStr) ||
          sub.DurationSubs?.actual_days?.toString().includes(searchStr) ||
          sub.DurationSub?.quantity?.toString().includes(searchStr) ||
          sub.MealSub?.meal_type?.toLowerCase().includes(searchStr) ||
          sub.PricingDetails?.price?.toString().includes(searchStr) ||
          sub.FoodSubscription?.some(
            (item) =>
              item.FoodItems?.item_name?.toLowerCase().includes(searchStr) ||
              item.FoodItems?.item_type?.toLowerCase().includes(searchStr)
          )
        );
      });
      setFilteredSubscriptions(filtered);
      setPagination((prev) => ({
        ...prev,
        totalEntries: filtered.length,
        currentPage: 1,
      }));
    }
  }, [searchTerm, subscriptions]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredSubscriptions;

    return [...filteredSubscriptions].sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case "parent_plan":
          aValue = a.parentPlan1?.plan_name || "";
          bValue = b.parentPlan1?.plan_name || "";
          break;
        case "tier":
          aValue = a.TierSub?.type || "";
          bValue = b.TierSub?.type || "";
          break;
        case "duration":
          aValue = a.DurationSubs?.actual_days || 0;
          bValue = b.DurationSubs?.actual_days || 0;
          break;
        case "quantity":
          aValue = a.DurationSub?.quantity || 0;
          bValue = b.DurationSub?.quantity || 0;
          break;
        case "meal_type":
          aValue = a.MealSub?.meal_type || "";
          bValue = b.MealSub?.meal_type || "";
          break;
        case "price":
          aValue = a.PricingDetails?.price || 0;
          bValue = b.PricingDetails?.price || 0;
          break;
        default:
          aValue = a[sortConfig.key] || "";
          bValue = b[sortConfig.key] || "";
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
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

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      parent_plan_id: subscription.parent_plan_id,
      plan_description: subscription.plan_description,
      tier_id: subscription.tier_id,
      duration_id: subscription.duration_id,
      quantity_id: subscription.quantity_id,
      meal_type_id: subscription.meal_type_id,
      price: subscription.PricingDetails?.price || "",
      food_items:
        subscription.FoodSubscription?.map((item) => item.food_item_id) || [],
    });
    setShowAddPlanModal(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (editingSubscription) {
        res = await axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/${editingSubscription.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Subscription updated successfully!");
      } else {
        res = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/with-food`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Subscription created successfully!");
      }

      closeAddPlanModal();
      fetchSubscriptions();
    } catch (error) {
      console.error("Error saving subscription:", error);
      toast.error(
        `Failed to ${
          editingSubscription ? "update" : "create"
        } subscription plan`
      );
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAddPlanModal();
    }
  };

  const closeAddPlanModal = () => {
    setShowAddPlanModal(false);
    setEditingSubscription(null);
    setFormData({
      parent_plan_id: "",
      plan_description: "",
      tier_id: "",
      duration_id: "",
      quantity_id: "",
      meal_type_id: "",
      price: "",
      food_items: [],
    });
  };

  if (loading) return <div>Loading...</div>;

  const handleDurationSubmit = async (durationData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/createduration`,
        durationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Duration created successfully!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error saving duration:", error);
    }
  };

  const handleQuantitySubmit = async (quantityData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/quantity/craetequantity`,
        quantityData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Duration created successfully!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error saving duration:", error);
    }
  };

  const handleParentPlanSubmit = async (planData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/parentplan/createplan`,
        planData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Duration created successfully!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error saving duration:", error);
    }
  };

  //this is updated one
 
  const handleFoodItemsSubmit = async (itemData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/fooditem/createfooditem`,
        itemData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Duration created successfully!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error saving duration:", error);
    }
  };

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>


      <div className="subscriptions-container">
        <div className="subscriptions-header">
          <h2>Subscription Plans</h2>
          <div className="add--button">
            <button onClick={() => setShowAddPlanModal(true)}>
              <AddIcon /> Add Plan
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
              placeholder="Search All Fields..."
            />
          </div>
        </div>

        <div className="subscriptions-table-container">
          <table className="subscriptions-table">
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
                  onClick={() => requestSort("parent_plan")}
                >
                  Parent Plan {getSortIcon("parent_plan")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("plan_description")}
                >
                  Description {getSortIcon("plan_description")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("tier")}
                >
                  Tier {getSortIcon("tier")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("duration")}
                >
                  Duration {getSortIcon("duration")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("quantity")}
                >
                  Quantity {getSortIcon("quantity")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("meal_type")}
                >
                  Meal Type {getSortIcon("meal_type")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("price")}
                >
                  Price {getSortIcon("price")}
                </th>
                <th>Food Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.parentPlan1?.plan_name || "N/A"}</td>
                  <td>{sub.plan_description}</td>
                  <td>{sub.TierSub?.type || "N/A"}</td>
                  <td>
                    {sub.DurationSubs
                      ? `${sub.DurationSubs.actual_days} days (+${sub.DurationSubs.addon_days})`
                      : "N/A"}
                  </td>
                  <td>{sub.DurationSub?.quantity || "N/A"}</td>
                  <td>{sub.MealSub?.meal_type || "N/A"}</td>
                  <td>₹{sub.PricingDetails?.price || "N/A"}</td>
                  <td>
                    {sub.FoodSubscription?.length > 0 ? (
                      <ul className="food-items-list">
                        {sub.FoodSubscription.map((item) => (
                          <li key={item.food_item_id}>
                            {item.FoodItems?.item_name} (
                            {item.FoodItems?.item_type})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No items"
                    )}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(sub)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(sub.id)}
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
      </div>

      {showAddPlanModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content-main large-modal">
            <div className="model-header">
              <h3>
                {editingSubscription ? "Edit" : "Add New"} Subscription Plan
              </h3>
              <button type="button" onClick={closeAddPlanModal}>
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-form-grid">
                <label>
                  <div>Parent Plan</div>
                  <select
                    name="parent_plan_id"
                    value={formData.parent_plan_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Parent Plan</option>
                    {formOptions.parentPlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.plan_name}
                      </option>
                    ))}
                    <option value="other">Other (Create New)</option>
                  </select>
                </label>

                <label>
                  <div>Plan Description</div>
                  <input
                    name="plan_description"
                    value={formData.plan_description}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  <div>Tier</div>
                  <select
                    name="tier_id"
                    value={formData.tier_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Tier</option>
                    {formOptions.tiers.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <div>Duration</div>
                  <select
                    name="duration_id"
                    value={formData.duration_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Duration</option>
                    {formOptions.durations.map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.actual_days} days (+{duration.addon_days}{" "}
                        addon)
                      </option>
                    ))}
                    <option value="other">Other (Create New)</option>
                  </select>
                </label>

                <label>
                  <div>Quantity</div>
                  <select
                    name="quantity_id"
                    value={formData.quantity_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Quantity</option>
                    {formOptions.quantities.map((quantity) => (
                      <option key={quantity.id} value={quantity.id}>
                        {quantity.quantity}
                      </option>
                    ))}
                    <option value="other">Other (Create New)</option>
                  </select>
                </label>

                <label>
                  <div>Meal Type</div>
                  <select
                    name="meal_type_id"
                    value={formData.meal_type_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Meal Type</option>
                    {formOptions.mealTypes.map((mealType) => (
                      <option key={mealType.id} value={mealType.id}>
                        {mealType.meal_type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <div>Price</div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </label>
              </div>

              <div className="food-items-section">
                <h4>Select Food Items</h4>
                <button
                  type="button"
                  className="add-food-btn"
                  onClick={() => setActiveModal("foodItem")}
                >
                  <AddIcon /> Add New Food Item
                </button>
                <div className="food-items-checkboxes">
                  {formOptions.fooditems.map((item) => (
                    <div key={item.id} className="food-item-checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.food_items.includes(item.id)}
                            onChange={() => handleFoodItemToggle(item.id)}
                          />
                        }
                        label={`${item.item_name} (${item.item_type})`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-buttons">
                <button type="submit">
                  {editingSubscription ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === "parentPlan" && (
        <ParentPlanModal
          onClose={closeModal}
          onSubmit={(durationData, onSuccess) => {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/createduration`,
                durationData,
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then(() => {
                toast.success("Duration created successfully!");
                handleCreationSuccess();
                onSuccess(); // This will close the modal
              })
              .catch((error) => {
                console.error("Error creating duration:", error);
                toast.error("Failed to create duration");
              });
          }}
          initialData={null}
          isStandalone={false}
        />
      )}

      {activeModal === "parentPlan" && (
        <ParentPlanModal
          onClose={closeModal}
          onSubmit={handleParentPlanSubmit}
          initialData={null}
          isStandalone={false}
        />
      )}

      {activeModal === "duration" && (
        <DurationModal
          onClose={closeModal}
          onSubmit={handleDurationSubmit}
          initialData={null}
          isStandalone={false}
        />
      )}

      {activeModal === "quantity" && (
        <QuantityModal
          onClose={closeModal}
          onSubmit={handleQuantitySubmit}
          initialData={null}
          isStandalone={false}
        />
      )}

      {activeModal === "foodItem" && (
        <FoodItemModal
          onClose={closeModal}
          onSubmit={handleFoodItemsSubmit}
          initialData={null}
          isStandalone={false}
        />
      )}
    </div>
  );
};

export default MainAddSubscription;
