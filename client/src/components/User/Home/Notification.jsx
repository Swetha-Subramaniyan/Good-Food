import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notification.css";
import { useSidebar } from "../../Sidebar/SidebarContext";

 
const Notification = () => {

  const { isOpen } = useSidebar();

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/notification/getAllNotificationsWithDetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markNotificationAsViewed = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/notification/markNotificationAsViewed`,
        { notifications: [notificationId] }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, viewed: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as viewed:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      const unreadNotifications = notifications.filter(
        (notification) => !notification.viewed
      );
      const unreadIds = unreadNotifications.map(
        (notification) => notification.id
      );

      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/notification/markNotificationAsViewed`,
        { notifications: unreadIds }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          unreadIds.includes(notification.id)
            ? { ...notification, viewed: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "read") return notification.viewed;
    if (filter === "unread") return !notification.viewed;
    return true; 
  });

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="notification-container">
        <h3>Notifications</h3>
        <div className="notification-controls">
          <div>
            {" "}
            <button onClick={markAllAsRead} className="mark-all-read-button">
              Mark All as Read
            </button>
          </div>
          <div style={{ display: "flex", columnGap: "1rem" }}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>
            <button onClick={() => setFilter("all")} className="reset-button">
              Reset
            </button>
          </div>
        </div>
        <div className="notification-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.viewed ? "read" : "unread"
              }`}
            >
              <div className="notification-header">
                <h4 className="notification-type">
                  {notification.notificationDetails.entity_type}
                </h4>
                <h5 className="notification-time">
                  {formatDate(notification.notificationDetails.created_at)}
                </h5>
              </div>
              <div className="notification-details">
                {notification.notificationDetails.entity_type ===
                  "Subscription" && (
                  <>
                    <h6>Plan: {notification.details.parentPlan1.plan_name}</h6>
                    <h6>Tier: {notification.details.TierSub.type}</h6>
                    <h6>Meal: {notification.details.MealSub.meal_type}</h6>
                    <h6>Price: ${notification.details.PricingDetails.price}</h6>
                  </>
                )}
                {notification.notificationDetails.entity_type ===
                  "user_address" && (
                  <>
                    {notification.details.map((detail, index) => (
                      <div key={index}>
                        <p>Name: {detail.name}</p>
                        <p>
                          Address: {detail.street}, {detail.city},{" "}
                          {detail.pincode}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="notification-actions">
                {!notification.viewed && (
                  <button
                    onClick={() => markNotificationAsViewed(notification.id)}
                    className="mark-as-read-button"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
