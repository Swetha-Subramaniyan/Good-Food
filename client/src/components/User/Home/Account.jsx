import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Account.css";
import { useSidebar } from "../../Sidebar/SidebarContext";

const Account = () => {
  const { isOpen } = useSidebar();

  const [userDetails, setUserDetails] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/getNO`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("User Details and Addresses Fetched:", response.data);

        let subscriptions = response.data.userSubscriptions || [];
        if (subscriptions.length > 0) {
          subscriptions.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setUserDetails(subscriptions[0]);
        } else {
          setUserDetails(null);
        }

        setUserAddresses(response.data.getUser || []);
      } catch (error) {
        console.error("Error fetching user details or addresses:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const userAddress = userAddresses[0] || {};

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="form-container">
        <h2>My Profile</h2>
        <br />
        <form>
          <div className="subscription-details">
            <div className="form-group">
              <label>Name:</label>
              <span>{userAddress?.name || "N/A"}</span>
            </div>

            <div className="form-group">
              <label>Email ID:</label>
              <span>{userAddress?.email || "N/A"}</span>
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <span>{userAddress?.phone_number || "N/A"}</span>
            </div>

            {userAddresses.length > 0 && (
              <>
                <h3>Delivery Addresses</h3>
                {userAddresses.map((address, index) => (
                  <div key={index} className="address-box">
                    <div className="form-group">
                      <label>Delivery Address {index + 1}:</label>
                      <span>
                        {address.landmark}, {address.street}, {address.city},{" "}
                        {address.pincode}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="form-group">
              <label>Customer ID:</label>
              <span>{userDetails?.customer_id || "N/A"}</span>
            </div>
            <div className="form-group">
              <label>Subscription Plan:</label>
              <span>
                {userDetails?.Subscription?.parentPlan1?.plan_name || "N/A"}
              </span>
            </div>
            <div className="form-group">
              <label>Meal Type:</label>
              <span>{userDetails?.Subscription?.TierSub?.type || "N/A"}</span>
            </div>
            <div className="form-group">
              <label>Subscription Days:</label>
              <span>
                {userDetails?.Subscription?.DurationSubs?.actual_days || "N/A"}{" "}
                Days
              </span>
            </div>
            <div className="form-group">
              <label>Price:</label>
              <span>
                ₹{userDetails?.Subscription?.PricingDetails?.price || "N/A"}
              </span>
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <span>
                {userDetails ? formatDate(userDetails.start_date) : "N/A"}
              </span>
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <span>
                {userDetails ? formatDate(userDetails.end_date) : "N/A"}
              </span>
            </div>
            <div className="form-group">
              <label>Validity:</label>
              <span>{userDetails?.validity_days || "N/A"} Days</span>
            </div>
          </div>
          <br />
          <div className="subscription-details">
            <div className="payment-method">
              <h4 style={{ fontWeight: "bold" }}>
                Refer Your Friend and Get Discount
              </h4>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
