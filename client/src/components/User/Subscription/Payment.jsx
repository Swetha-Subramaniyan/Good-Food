import React, { useState, useEffect } from "react";
import "./Payment.css";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import WhatsappQr from "./WhatsappQr";

const Payment = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState({});
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);
  const [AddressData, setAddressData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    addresses: [{ landmark: "", street: "", city: "", pincode: "" }],
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/subscriptions/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const subData = response.data.subscription;
        setSubscription(subData);
        setAmount(subData?.PricingDetails?.price || 0);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch subscription details"
        );
      }
    };

    //fetching Address
    const fetchUserAddressDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/getNo`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const AddressData = response.data[0].userAddress;
        setAddressData(AddressData);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch Address  details"
        );
      }
    };

    if (id) {
      fetchSubscriptionDetails();
      fetchUserAddressDetails();
    }
  }, [id]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index][name] = value;
    setFormData((prevData) => ({ ...prevData, addresses: updatedAddresses }));
  };

  const handleAddAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      addresses: [
        ...prevData.addresses,
        { landmark: "", street: "", city: "", pincode: "" },
      ],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData && formData.phone_number) {
        if (
          !formData.phone_number.startsWith("+91") ||
          !formData.phone_number.startsWith("91")
        ) {
          formData.phone_number = `91${formData.phone_number}`;
        }
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/createPhone`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Form Submitted:", response.data);

      setSuccessMessage(response.data.message);

      const responseForNotification = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/notification/sendEmailOnUserMultipleAddressUpdate`,
        { entity_id: response.data.createPhone.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Addresses Updated successfully!");

      setShowModal(true);
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        addresses: [{ landmark: "", street: "", city: "", pincode: "" }],
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit address");
    }
  };

  const handlePayment = async () => {
    if (!amount) {
      alert("Amount not available");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const keyResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/payment/getKey`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const razorpayKey = keyResponse.data.key;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/payment/razorPay`,
        { subscription_id: id, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.order) {
        alert("Failed to create order.");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: "INR",
        name: "Your Company",
        description: "Payment Transaction",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${process.env.REACT_APP_BACKEND_SERVER_URL}/payment/update`,
              {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                subscription_id: id,
                payment_status: "captured",
                payment_info: JSON.stringify(response),
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const userSubscriptionId = data.subscription?.id;

            const responseForNotification = await axios.post(
              `${process.env.REACT_APP_BACKEND_SERVER_URL}/notification/sendNotificationOnSubscription`,
              { entity_id: userSubscriptionId },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (userSubscriptionId) {
              alert("Payment successful!");
              navigate(`/user/Home/${userSubscriptionId}`);
            } else {
              alert("Failed to create user subscription. Please try again.");
            }
          } catch (err) {
            console.error("Error updating payment status:", err);
            alert("Payment success but failed to update status.");
          }
        },

        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("Something went wrong with the payment.");
    }
  };

  const formatDate = (date) => date.toLocaleDateString("en-GB");

  const planName = subscription?.parentPlan1?.plan_name || "N/A";
  const mealType = subscription?.MealSub?.meal_type || "N/A";
  const tierType = subscription?.TierSub?.type || "N/A";
  const price = subscription?.PricingDetails?.price || "N/A";
  const days = subscription?.DurationSubs?.actual_days || 0;
  const addonDays = subscription?.DurationSubs?.addon_days || 0;
  const validity = days + addonDays;

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + validity);

  const isIndividualPlan = planName === "Individual Plan";
  const showAddAddressButton = !(isIndividualPlan && AddressData.length >= 2);

  const hasAddress = AddressData.length > 0;
  console.log(hasAddress);

  return (
      <div className="details-back">
        <div className="form-container">
        <h2>Subscription Details</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="subscription-details">
            <div className="form-group">
              <label>Subscription Plan:</label>
              <span>
                {planName}-{tierType}
              </span>
            </div>
            <div className="form-group">
              <label>Meal Type:</label>
              <span>{mealType}</span>
            </div>
            <div className="form-group">
              <label>Subscription Price:</label>
              <span>₹{price}</span>
            </div>
            <div className="form-group">
              <label>Subscription Days:</label>
              <span>{days} Days</span>
            </div>
            <div className="form-group">
              <label>Starting Date:</label>
              <span>{formatDate(startDate)}</span>
            </div>
            <div className="form-group">
              <label>Ending Date:</label>
              <span>{formatDate(endDate)}</span>
            </div>
            <div className="form-group">
              <label>Subscription Validity:</label>
              <span>{validity} Days</span>
            </div>
          </div>

          {AddressData.map((address, index) => (
            <div key={index} className="address-box">
              <h4>Delivery Address {index + 1}</h4>
              <p>Landmark: {address.landmark}</p>
              <p>Street: {address.street}</p>
              <p>City: {address.city}</p>
              <p>Pincode: {address.pincode}</p>
            </div>
          ))}

          {showAddAddressButton && (
            <div>
              {" "}
              <h2>Food Delivery Details</h2>
              <div className="form-group">
                <label>Name:</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email ID:</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number : (WhatsApp)</label>
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {formData.addresses.map((address, index) => (
                <div key={index} className="address-box">
                  <h4>Delivery Address {index + 1}</h4>
                  <input
                    name="landmark"
                    value={address.landmark}
                    onChange={(e) => handleAddressInputChange(index, e)}
                    placeholder="Landmark"
                    required
                  />
                  <input
                    name="street"
                    value={address.street}
                    onChange={(e) => handleAddressInputChange(index, e)}
                    placeholder="Street"
                    required
                  />
                  <input
                    name="city"
                    value={address.city}
                    onChange={(e) => handleAddressInputChange(index, e)}
                    placeholder="City"
                    required
                  />
                  <input
                    name="pincode"
                    value={address.pincode}
                    onChange={(e) => handleAddressInputChange(index, e)}
                    placeholder="Pincode"
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddAddress}>
                + Add Delivery Address
              </button>
              <button type="submit">Submit Addresses</button>
              {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
              )}
              <div>
                <Link to={"/user/Home"}>
                  <button> Next </button>
                </Link>
              </div>
            </div>
          )}
        </form>
        <button
          type="button"
          className="submit-color"
          onClick={handlePayment}
          disabled={!hasAddress}
          style={{
            cursor: hasAddress ? "pointer" : "not-allowed",
          }}
          title={
            !hasAddress ? "You need to add at least 1 delivery address" : ""
          }
        >
          Pay ₹{price || 0}
        </button>
      
      {showModal && <WhatsappQr onClose={() => setShowModal(false)} />}
      <div className="foodd">
        <h2>Subscription Details</h2>
        <div className="subscription-details">
          <div className="form-group">
            <label>
              Subscription Plan:{" "}
              <span>
                {planName}-{tierType}
              </span>
            </label>
          </div>
          <div className="form-group">
            <label>
              Meal Type: <span>{mealType}</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              Subscription Price: <span>₹{price}</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              Subscription Days: <span>{days} Days</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              Starting Date: <span>{formatDate(startDate)}</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              Ending Date: <span>{formatDate(endDate)}</span>
            </label>
          </div>
          <div className="form-group">
            <label>
              Subscription Validity: <span>{validity} Days</span>
            </label>
          </div>
        </div>
        <button type="button" className="submit-color" onClick={handlePayment}>
          Pay ₹{price || 0}
        </button>
      </div>
      </div>
      </div>
  );
};

export default Payment;
