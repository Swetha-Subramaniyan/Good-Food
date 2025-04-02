import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainAddSubscription.css";
import { useNavigate } from "react-router-dom";
import MainSidebar from "../AdminSidebar/MainSidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const NewParentPlanModal = ({ onClose, onSuccess }) => {
  const [planName, setPlanName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/parentplan/createplan`,
        { plan_name: planName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        toast.success("Parent plan created successfully!");
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create parent plan");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>Create New Parent Plan</h3>
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
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
/* 
const NewTierModal = ({ onClose, onSuccess }) => {
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tiers`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Tier created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to create tier");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>Create New Tier</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            <div>Tier Type:</div>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}; */

const NewDurationModal = ({ onClose, onSuccess }) => {
  const [actualDays, setActualDays] = useState("");
  const [addonDays, setAddonDays] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/duration/createduration`,
        { actual_days: parseInt(actualDays), addon_days: parseInt(addonDays) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res, "res");
      if (res.status === 201) {
        toast.success("Duration created successfully!");
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create duration");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>Create New Durationn</h3>
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
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NewQuantityModal = ({ onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/quantity/craetequantity`,
        { quantity: parseInt(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Quantity created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to create quantity");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-header">
          <h3>Create New Quantity</h3>
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>Quantity:</div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* const NewMealTypeModal = ({ onClose, onSuccess }) => {
  const [mealType, setMealType] = useState("Breakfast");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/meal-types`,
        { meal_type: mealType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Meal type created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to create meal type");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

      <div className="model-header">
        <h3>Create New Meal Type</h3>
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
        <form onSubmit={handleSubmit}>
          <label>
            <div>
            Meal Type:
            </div>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Combo">Combo</option>
            </select>
          </label>
          <div className="modal-buttons">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}; */

const MainAddSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    parent_plan_id: "",
    plan_description: "",
    tier_id: "",
    duration_id: "",
    quantity_id: "",
    meal_type_id: "",
    price: "",
  });
  const [formOptions, setFormOptions] = useState({
    parentPlans: [],
    tiers: [],
    durations: [],
    quantities: [],
    mealTypes: [],
  });
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const fetchFormOptions = async () => {
    try {
      const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");
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
        const token = localStorage.getItem("token");
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

  const handleEdit = (id) => {
    navigate(`/admin/editsubscription/${id}`);
  };

  const handleCreateNew = () => {
    navigate("/admin/addsubscription");
  };

  useEffect(() => {
    fetchFormOptions();
    fetchSubscriptions();
  }, []);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value === "other") {
      switch (name) {
        case "parent_plan_id":
          setActiveModal("parentPlan");
          break;
        case "tier_id":
          setActiveModal("tier");
          break;
        case "duration_id":
          setActiveModal("duration");
          break;
        case "quantity_id":
          setActiveModal("quantity");
          break;
        case "meal_type_id":
          setActiveModal("mealType");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/with-food`,
        {
          ...formData,
          food_items: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("res", res);
      navigate("/admin/addmenuitems", {
        state: { subscriptionData: formData },
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast.error("Failed to create subscription plan");
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleCreationSuccess = () => {
    fetchFormOptions();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <MainSidebar />

      <div className="subscriptions-container">
        <div className="subscriptions-header">
          <h2>Subscription Plans</h2>
          <div className="add--button">
            <button onClick={toggleFormVisibility}><AddIcon /> Add Plan</button>
          </div>
        </div>

        <div className="subscriptions-table-container">
          <table className="subscriptions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Parent Plan</th>
                <th>Description</th>
                <th>Tier</th>
                <th>Duration</th>
                <th>Quantity</th>
                <th>Meal Type</th>
                <th>Price</th>
                <th>Food Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
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
                      onClick={() => handleEdit(sub.id)}
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
      </div>

      {isFormVisible && (
        <div className="back--admin">
          <form onSubmit={handleSubmit} className="plan-style">
            <div className="pop-break">
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
                  {/* <option value="other">Other (Create New)</option> */}
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
                      {duration.actual_days} days (+{duration.addon_days} addon)
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
                  {/*  <option value="other">Other (Create New)</option> */}
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

            <div className="admin--submit">
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
      )}

      {activeModal === "parentPlan" && (
        <NewParentPlanModal
          onClose={closeModal}
          onSuccess={handleCreationSuccess}
        />
      )}

      {/* {activeModal === "tier" && (
        <NewTierModal onClose={closeModal} onSuccess={handleCreationSuccess} />
      )} */}

      {activeModal === "duration" && (
        <NewDurationModal
          onClose={closeModal}
          onSuccess={handleCreationSuccess}
        />
      )}
      {activeModal === "quantity" && (
        <NewQuantityModal
          onClose={closeModal}
          onSuccess={handleCreationSuccess}
        />
      )}
      {/* {activeModal === "mealType" && (
        <NewMealTypeModal
          onClose={closeModal}
          onSuccess={handleCreationSuccess}
        />
      )} */}
    </>
  );
};

export default MainAddSubscription;
