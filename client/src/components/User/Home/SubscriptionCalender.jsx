import React, { useState, useEffect, version } from "react";
import "./SubscriptionCalender.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { useSidebar } from "../../Sidebar/SidebarContext";
import PaginationControls from "../../Utils/PaginationControls";

const SubscriptionCalender = () => {
  const { isOpen } = useSidebar();
  const [subscription, setSubscription] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [skipCriteria, setSkipCriteria] = useState(null);
  const [timeLeftToSkip, setTimeLeftToSkip] = useState({});
  const [timeLeftToReorder, setTimeLeftToReorder] = useState({});
  const [showTimeLeftBanner, setShowTimeLeftBanner] = useState(false);
  const [cancellationAllowed, setCancellationAllowed] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isPlanExpired, setIsPlanExpired] = useState(false);
  const [cancellationStatus, setCancellationStatus] = useState({
    isCancelled: false,
    cancellationPending: false,
  });

  const fetchUserReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/getUserFoodReport`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Ress", response);

      const criteriaResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/skipcart/getSkipCriteria`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { getReport } = response.data;
      const latestSubscription =
        getReport.userSubscription[getReport.userSubscription.length - 1];

      const mealTypes = {
        1: "Breakfast",
        2: "Lunch",
        3: "Dinner",
        4: "Combo",
      };

      setSubscription(latestSubscription);
      setSkipCriteria(criteriaResponse.data.skipCriteria);

      const startDate = new Date(latestSubscription.start_date);
      const endDate = new Date(latestSubscription.end_date);
      const daysList = [];
      let currentDate = new Date(startDate);

      const mealItems = {
        breakfast: [],
        lunch: [],
        dinner: [],
        combo: [],
      };

      latestSubscription.Subscription.FoodSubscription.forEach((item) => {
        const mealType = mealTypes[item.meal_type_id];

        console.log("mealtype", mealType);

        const foodItem = {
          ...item.FoodItems,
          mealType,
          mealTypeId: item.meal_type_id,
          quantity: 1,
        };

        if (mealType === "Combo") {
          mealItems.breakfast.push(foodItem);
          mealItems.lunch.push(foodItem);
          mealItems.dinner.push(foodItem);
        } else {
          mealItems[mealType.toLowerCase()].push(foodItem);
        }
      });

      const skippedMeals = latestSubscription.userSubscriptionSkippedCart || [];

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split("T")[0];

        const dateSkippedMeals = skippedMeals.filter(
          (skipped) =>
            new Date(skipped.skipped_date).toISOString().split("T")[0] ===
            formattedDate
        );

        const breakfastItems = dateSkippedMeals.some((skipped) => {
          const skippedMeal = mealItems.breakfast.find(
            (item) => item.id === skipped.skipped_meal_item_id
          );
          return skippedMeal;
        })
          ? []
          : [...mealItems.breakfast];

        const lunchItems = dateSkippedMeals.some((skipped) => {
          const skippedMeal = mealItems.lunch.find(
            (item) => item.id === skipped.skipped_meal_item_id
          );
          return skippedMeal;
        })
          ? []
          : [...mealItems.lunch];

        const dinnerItems = dateSkippedMeals.some((skipped) => {
          const skippedMeal = mealItems.dinner.find(
            (item) => item.id === skipped.skipped_meal_item_id
          );
          return skippedMeal;
        })
          ? []
          : [...mealItems.dinner];

        daysList.push({
          date: formattedDate,
          breakfast: breakfastItems,
          lunch: lunchItems,
          dinner: dinnerItems,
          user_subscription_id: latestSubscription.id,
          skippedMeals: dateSkippedMeals,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setFoodData(daysList);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch reports.");
    }
  };

  useEffect(() => {
    fetchUserReports();
  }, []);

  useEffect(() => {
    if (!skipCriteria || !foodData.length) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const skipTimes = {};
      const reorderTimes = {};

      foodData.forEach((day) => {
        const mealDate = new Date(day.date);
        mealDate.setHours(0, 0, 0, 0);

        if (mealDate <= now) return;

        ["breakfast", "lunch", "dinner"].forEach((mealType) => {
          const criteria = skipCriteria.find(
            (c) => c.MealType.meal_type.toLowerCase() === mealType
          );
          if (!criteria) return;

          const skipCutoff = calculateCutoffTime(
            mealDate,
            criteria.cutoff_time
          );

          const timeLeftToSkip = skipCutoff - now;

          const reorderCutoff = new Date(skipCutoff);
          reorderCutoff.setHours(reorderCutoff.getHours() - 1);
          const timeLeftToReorder = reorderCutoff - now;

          const key = `${day.date}-${mealType}`;
          skipTimes[key] = timeLeftToSkip;
          reorderTimes[key] = timeLeftToReorder;
        });
      });

      setTimeLeftToSkip(skipTimes);
      setTimeLeftToReorder(reorderTimes);
      setShowTimeLeftBanner(
        Object.values(skipTimes).some((time) => time > 0 && time < 48594029)
      );
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [skipCriteria, foodData]);

  const checkCancellationStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/cancel/checkCancellationStatus/${subscription.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCancellationStatus(response.data);
    } catch (err) {
      console.error("Error checking cancellation status:", err);
    }
  };

  useEffect(() => {
    if (subscription) {
      const now = new Date();
      const endDate = new Date(subscription.end_date);
      setIsPlanExpired(now > endDate);
    }
    checkCancellationStatus();
  }, [subscription]);

  useEffect(() => {
    if (subscription && foodData.length) {
      const now = new Date();
      const startDate = new Date(subscription.start_date);
      const endDate = new Date(subscription.end_date);

      const totalDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );

      const daysPassed = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));

      const percentageConsumed = (daysPassed / totalDays) * 100;

      setCancellationAllowed(percentageConsumed < 15 && now < endDate);
    }
  }, [subscription, foodData]);

  const calculateCutoffTime = (mealDate, cutoffTimeStr) => {
    const isNegative = cutoffTimeStr.startsWith("-");
    const timeParts = cutoffTimeStr.replace("-", "").split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    // Create a new date object based on the meal date
    const cutoffTime = new Date(mealDate);

    if (isNegative) {
      // For negative times, set to previous day at the specified time
      cutoffTime.setDate(cutoffTime.getDate() - 1); // Go back one day
      cutoffTime.setHours(hours, minutes, 0, 0); // Set to exact time on previous day
    } else {
      // For positive times, set to same day at specified time
      cutoffTime.setHours(hours, minutes, 0, 0);
    }
    console.log("date", cutoffTime);

    return cutoffTime;
  };

  const formatTimeLeft = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCancelSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/cancel/cancelSubscription`,
        {
          subscription_id: subscription.Subscription.id,
          user_subscription_id: subscription.id,
          cancellation_reason: cancellationReason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        alert("Subscription cancelled successfully");
        setShowCancelModal(false);
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to cancel subscription.");
      alert(err.response?.data?.error || "Failed to cancel subscription.");
    }
  };

  const handleReorderMeal = async (date, mealType) => {
    try {
      const token = localStorage.getItem("token");
      const dayData = foodData.find((day) => day.date === date);

      if (
        !dayData ||
        !dayData.skippedMeals ||
        dayData.skippedMeals.length === 0
      ) {
        return;
      }

      let skippedCartIds = [];

      if (mealType === "breakfast") {
        skippedCartIds = dayData.skippedMeals
          .filter((skipped) => {
            const skippedItem = subscription.Subscription.FoodSubscription.find(
              (item) =>
                item.FoodItems.id === skipped.skipped_meal_item_id &&
                item.meal_type_id === 1
            );
            return skippedItem;
          })
          .map((skipped) => skipped.skipped_cart_id);
      } else if (mealType === "lunch") {
        skippedCartIds = dayData.skippedMeals
          .filter((skipped) => {
            const skippedItem = subscription.Subscription.FoodSubscription.find(
              (item) =>
                item.FoodItems.id === skipped.skipped_meal_item_id &&
                item.meal_type_id === 2
            );
            return skippedItem;
          })
          .map((skipped) => skipped.skipped_cart_id);
      } else if (mealType === "dinner") {
        skippedCartIds = dayData.skippedMeals
          .filter((skipped) => {
            const skippedItem = subscription.Subscription.FoodSubscription.find(
              (item) =>
                item.FoodItems.id === skipped.skipped_meal_item_id &&
                item.meal_type_id === 3
            );
            return skippedItem;
          })
          .map((skipped) => skipped.skipped_cart_id);
      }

      if (skippedCartIds.length === 0) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/skipcart/reorderSkippedItem`,
        {
          skippedCartIds: skippedCartIds,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        fetchUserReports();

        alert(`Successfully reordered ${mealType} for ${date}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reorder meals.");
      alert(err.response?.data?.error || "Failed to reorder meals.");
    }
  };

  const handleSkipMeal = async (date, mealType) => {
    try {
      const dayData = foodData.find((day) => day.date === date);
      if (!dayData || dayData[mealType].length === 0) {
        return;
      }

      const token = localStorage.getItem("token");
      const itemIds = dayData[mealType].map((item) => item.id);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/skipcart/skipCartItem`,
        {
          skipped_meal_item_ids: itemIds,
          user_subscription_id: dayData.user_subscription_id,
          skip_date: date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        fetchUserReports();
        alert(`Successfully skipped ${mealType} for ${date}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to skip meals.");
      alert(err.response?.data?.error || "Failed to skip meals.");
    }
  };

  const shouldShowSkipButton = (date, mealType) => {
    if (!skipCriteria) return false;

    const today = new Date();
    const mealDate = new Date(date);
    const isPastDate = mealDate <= today;

    if (isPastDate) return false;

    let criteria;
    switch (mealType) {
      case "breakfast":
        criteria = skipCriteria.find(
          (c) => c.MealType.meal_type === "Breakfast"
        );
        break;
      case "lunch":
        criteria = skipCriteria.find((c) => c.MealType.meal_type === "Lunch");
        break;
      case "dinner":
        criteria = skipCriteria.find((c) => c.MealType.meal_type === "Dinner");
        break;
      default:
        return false;
    }

    if (!criteria) return false;

    const isNegative = criteria.cutoff_time.startsWith("-");
    const timeParts = criteria.cutoff_time.replace("-", "").split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    if (isNegative) {
      hours = -hours;
    }

    const skipPriorHours = parseInt(
      criteria.SkippedOrderCriteria[0].skip_prior_time
    );

    const cutoffTime = new Date(mealDate);
    cutoffTime.setHours(cutoffTime.getHours() + hours - skipPriorHours);
    cutoffTime.setMinutes(minutes);
    cutoffTime.setSeconds(0);
    cutoffTime.setMilliseconds(0);

    return today < cutoffTime;
  };

  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 5, // Default to 5 rows per page
    totalEntries: 0,
  });

  // Update totalEntries when foodData changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalEntries: foodData.length,
    }));
  }, [foodData]);

  // Handle page change
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  // Handle entries per page change
  const handleEntriesPerPageChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      entriesPerPage: size,
      currentPage: 1, // Reset to first page when changing page size
    }));
  };

  // Get paginated data
  const getPaginatedData = () => {
    const { currentPage, entriesPerPage } = pagination;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return foodData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    pagination.totalEntries / pagination.entriesPerPage
  );

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="sub-details">Subscription Details</div>
      {/* {error && <p className="error-message">{error}</p>} */}
      {subscription && (
        <div className="sub-info">
          <div className="sub-plan">
            <span className="plan-name">
              {subscription.Subscription.parentPlan1.plan_name}
            </span>
            <span className="tier">
              {subscription.Subscription.TierSub.type}
            </span>
            {isPlanExpired && (
              <span className="expired-badge">Plan Expired</span>
            )}
          </div>
          <div className="sub-dates">
            <div>
              {!isPlanExpired && (
                <>
                  <span>Validity: {subscription.validity_days} days</span>
                  <span>
                    {new Date(subscription.start_date).toLocaleDateString()} -{" "}
                    {new Date(subscription.end_date).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
            {cancellationAllowed && (
              <>
                {cancellationStatus.isCancelled ? (
                  <></>
                ) : (
                  <>
                    {cancellationStatus.cancellationPending ? (
                      <Tooltip
                        title="Admin approval pending for cancellation of this subscription"
                        placement="top"
                      >
                        <button
                          className="skip-button disabled-button"
                          disabled
                        >
                          Cancel Subscription
                        </button>
                      </Tooltip>
                    ) : (
                      <button
                        className="cancel-subscription-btn"
                        onClick={() => setShowCancelModal(true)}
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <br />

      {showCancelModal && (
        <div className="modal-overlay">
          <div className="cancel-modal">
            <h3>Cancel Subscription</h3>
            <p>Are you sure you want to cancel your subscription?</p>
            <textarea
              placeholder="Reason for cancellation"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button
                onClick={() => setShowCancelModal(false)}
                className="cancel-btn"
              >
                Go Back
              </button>
              <button
                onClick={handleCancelSubscription}
                className="confirm-btn"
                disabled={!cancellationReason}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination-headers">
        <div className="entries-per-page">
          <span>Show:</span>
          <select
            value={pagination.entriesPerPage}
            onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
      </div>

      <div className="table-container">
        <table className="meal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().length > 0 ? (
              getPaginatedData().map((day, index) => (
                <tr key={index} className="day-row">
                  <td className="date-cell">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td className="meal-cell">
                    {day.breakfast.length > 0 ? (
                      <div className="meal-container">
                        <div className="meal-items">
                          {day.breakfast.map((item, i) => (
                            <div key={i} className="meal-item">
                              <span className="item-name">
                                {item.item_name}
                              </span>
                              <span className="item-details">
                                ({item.item_type}) - ₹
                                {item.SubscriptionPriceDetails.price} x{" "}
                                {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                        {shouldShowSkipButton(day.date, "breakfast") && (
                          <>
                            {cancellationStatus.isCancelled ? (
                              <></>
                            ) : (
                              <>
                                {cancellationStatus.cancellationPending ? (
                                  <Tooltip
                                    title="Actions Not Allowed Since Cancellation of Subscription is in Processing"
                                    placement="top"
                                  >
                                    <button
                                      className="skip-button disabled-button"
                                      disabled
                                    >
                                      <FontAwesomeIcon icon={faForward} /> Skip
                                    </button>
                                  </Tooltip>
                                ) : (
                                  <div className="skip-button-container">
                                    {timeLeftToSkip[`${day.date}-breakfast`] >
                                      0 &&
                                      timeLeftToSkip[`${day.date}-breakfast`] <
                                        48594029 && (
                                        <div className="time-left-banner">
                                          {formatTimeLeft(
                                            timeLeftToSkip[
                                              `${day.date}-breakfast`
                                            ]
                                          )}{" "}
                                          left to skip
                                        </div>
                                      )}
                                    <Tooltip
                                      title="Skip Breakfast"
                                      placement="top"
                                    >
                                      <button
                                        className="skip-button"
                                        onClick={() =>
                                          handleSkipMeal(day.date, "breakfast")
                                        }
                                        disabled={
                                          timeLeftToSkip[
                                            `${day.date}-breakfast`
                                          ] <= 0
                                        }
                                      >
                                        <FontAwesomeIcon icon={faForward} />{" "}
                                        Skip
                                      </button>
                                    </Tooltip>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="no-meal">
                        {day.skippedMeals &&
                        day.skippedMeals.some((skipped) => {
                          const skippedItem =
                            subscription.Subscription.FoodSubscription.find(
                              (item) =>
                                item.FoodItems.id ===
                                  skipped.skipped_meal_item_id &&
                                item.meal_type_id === 1
                            );
                          return skippedItem;
                        }) ? (
                          <>
                            Breakfast skipped {"  "}
                            {shouldShowSkipButton(day.date, "breakfast") && (
                              <>
                                {cancellationStatus.isCancelled ? (
                                  <></>
                                ) : (
                                  <>
                                    {cancellationStatus.cancellationPending ? (
                                      <Tooltip
                                        title="Actions Not Allowed Since Cancellation of Subscription is in Processing"
                                        placement="top"
                                      >
                                        <button
                                          className="skip-button disabled-button"
                                          disabled
                                        >
                                          Reorder
                                        </button>
                                      </Tooltip>
                                    ) : (
                                      <div className="reorder-container">
                                        {timeLeftToReorder[
                                          `${day.date}-breakfast`
                                        ] > 0 &&
                                          timeLeftToReorder[
                                            `${day.date}-breakfast`
                                          ] < 48594029 && (
                                            <div className="time-left-banner">
                                              {formatTimeLeft(
                                                timeLeftToReorder[
                                                  `${day.date}-breakfast`
                                                ]
                                              )}{" "}
                                              left to reorder
                                            </div>
                                          )}
                                        <button
                                          className="reorder-button"
                                          onClick={() =>
                                            handleReorderMeal(
                                              day.date,
                                              "breakfast"
                                            )
                                          }
                                          disabled={
                                            timeLeftToReorder[
                                              `${day.date}-breakfast`
                                            ] <= 0
                                          }
                                        >
                                          Reorder
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          "No breakfast scheduled"
                        )}
                      </div>
                    )}
                  </td>

                  <td className="meal-cell">
                    {day.lunch.length > 0 ? (
                      <div className="meal-container">
                        <div className="meal-items">
                          {day.lunch.map((item, i) => (
                            <div key={i} className="meal-item">
                              <span className="item-name">
                                {item.item_name}
                              </span>
                              <span className="item-details">
                                ({item.item_type}) - ₹
                                {item.SubscriptionPriceDetails.price} x{" "}
                                {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                        {shouldShowSkipButton(day.date, "lunch") && (
                          <>
                            {cancellationStatus.isCancelled ? (
                              <></>
                            ) : (
                              <>
                                {cancellationStatus.cancellationPending ? (
                                  <Tooltip
                                    title="Actions Not Allowed Since Cancellation of Subscription is in Processing"
                                    placement="top"
                                  >
                                    <button
                                      className="skip-button disabled-button"
                                      disabled
                                    >
                                      <FontAwesomeIcon icon={faForward} /> Skip
                                    </button>
                                  </Tooltip>
                                ) : (
                                  <div className="skip-button-container">
                                    {timeLeftToSkip[`${day.date}-lunch`] > 0 &&
                                      timeLeftToSkip[`${day.date}-lunch`] <
                                        48594029 && (
                                        <div className="time-left-banner">
                                          {formatTimeLeft(
                                            timeLeftToSkip[`${day.date}-lunch`]
                                          )}{" "}
                                          left to skip
                                        </div>
                                      )}
                                    <Tooltip title="Skip Lunch" placement="top">
                                      <button
                                        className="skip-button"
                                        onClick={() =>
                                          handleSkipMeal(day.date, "lunch")
                                        }
                                        disabled={
                                          timeLeftToSkip[`${day.date}-lunch`] <=
                                          0
                                        }
                                      >
                                        <FontAwesomeIcon icon={faForward} />{" "}
                                        Skip
                                      </button>
                                    </Tooltip>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="no-meal">
                        {day.skippedMeals &&
                        day.skippedMeals.some((skipped) => {
                          const skippedItem =
                            subscription.Subscription.FoodSubscription.find(
                              (item) =>
                                item.FoodItems.id ===
                                  skipped.skipped_meal_item_id &&
                                item.meal_type_id === 2
                            );
                          return skippedItem;
                        }) ? (
                          <>
                            Lunch skipped {"  "}
                            {shouldShowSkipButton(day.date, "lunch") && (
                              <>
                                {cancellationStatus.isCancelled ? (
                                  <></>
                                ) : (
                                  <>
                                    {cancellationStatus.cancellationPending ? (
                                      <Tooltip
                                        title="Actions Not Allowed Since Cancellation of Subscription is in Processing"
                                        placement="top"
                                      >
                                        <button
                                          className="skip-button disabled-button"
                                          disabled
                                        >
                                          Reorder
                                        </button>
                                      </Tooltip>
                                    ) : (
                                      <div className="reorder-container">
                                        {timeLeftToReorder[
                                          `${day.date}-lunch`
                                        ] > 0 &&
                                          timeLeftToReorder[
                                            `${day.date}-lunch`
                                          ] < 48594029 && (
                                            <div className="time-left-banner">
                                              {formatTimeLeft(
                                                timeLeftToReorder[
                                                  `${day.date}-lunch`
                                                ]
                                              )}{" "}
                                              left to reorder
                                            </div>
                                          )}
                                        <button
                                          className="reorder-button"
                                          onClick={() =>
                                            handleReorderMeal(day.date, "lunch")
                                          }
                                          disabled={
                                            timeLeftToReorder[
                                              `${day.date}-lunch`
                                            ] <= 0
                                          }
                                        >
                                          Reorder
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          "No Lunch scheduled"
                        )}
                      </div>
                    )}
                  </td>

                  <td className="meal-cell">
                    {day.dinner.length > 0 ? (
                      <div className="meal-container">
                        <div className="meal-items">
                          {day.dinner.map((item, i) => (
                            <div key={i} className="meal-item">
                              <span className="item-name">
                                {item.item_name}
                              </span>
                              <span className="item-details">
                                ({item.item_type}) - ₹
                                {item.SubscriptionPriceDetails.price} x{" "}
                                {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                        {shouldShowSkipButton(day.date, "dinner") && (
                          <>
                            {cancellationStatus.isCancelled ? (
                              <></>
                            ) : (
                              <>
                                {cancellationStatus.cancellationPending ? (
                                  <Tooltip
                                    title="Actions Not Allowed Since Cancellation of Subscription is in Processing"
                                    placement="top"
                                  >
                                    <button
                                      className="skip-button disabled-button"
                                      disabled
                                    >
                                      <FontAwesomeIcon icon={faForward} /> Skip
                                    </button>
                                  </Tooltip>
                                ) : (
                                  <div className="skip-button-container">
                                    {timeLeftToSkip[`${day.date}-dinner`] > 0 &&
                                      timeLeftToSkip[`${day.date}-dinner`] <
                                        48594029 && (
                                        <div className="time-left-banner">
                                          {formatTimeLeft(
                                            timeLeftToSkip[`${day.date}-dinner`]
                                          )}{" "}
                                          left to skip
                                        </div>
                                      )}
                                    <Tooltip
                                      title="Skip Dinner"
                                      placement="top"
                                    >
                                      <button
                                        className="skip-button"
                                        onClick={() =>
                                          handleSkipMeal(day.date, "dinner")
                                        }
                                        disabled={
                                          timeLeftToSkip[
                                            `${day.date}-dinner`
                                          ] <= 0
                                        }
                                      >
                                        <FontAwesomeIcon icon={faForward} />{" "}
                                        Skip
                                      </button>
                                    </Tooltip>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="no-meal">
                        {day.skippedMeals &&
                        day.skippedMeals.some((skipped) => {
                          const skippedItem =
                            subscription.Subscription.FoodSubscription.find(
                              (item) =>
                                item.FoodItems.id ===
                                  skipped.skipped_meal_item_id &&
                                item.meal_type_id === 3
                            );
                          return skippedItem;
                        }) ? (
                          <>
                            Dinner skipped {"  "}
                            {shouldShowSkipButton(day.date, "dinner") && (
                              <>
                                {cancellationStatus.isCancelled ? (
                                  <></>
                                ) : (
                                  <>
                                    {cancellationStatus.cancellationPending ? (
                                      <Tooltip
                                        title="Actions Not Allowed Since Cancellation of Subscription is in Processing"
                                        placement="top"
                                      >
                                        <button
                                          className="skip-button disabled-button"
                                          disabled
                                        >
                                          Reorder
                                        </button>
                                      </Tooltip>
                                    ) : (
                                      <div className="reorder-container">
                                        {timeLeftToReorder[
                                          `${day.date}-dinner`
                                        ] > 0 &&
                                          timeLeftToReorder[
                                            `${day.date}-dinner`
                                          ] < 48594029 && (
                                            <div className="time-left-banner">
                                              {formatTimeLeft(
                                                timeLeftToReorder[
                                                  `${day.date}-dinner`
                                                ]
                                              )}{" "}
                                              left to reorder
                                            </div>
                                          )}
                                        <button
                                          className="reorder-button"
                                          onClick={() =>
                                            handleReorderMeal(
                                              day.date,
                                              "dinner"
                                            )
                                          }
                                          disabled={
                                            timeLeftToReorder[
                                              `${day.date}-dinner`
                                            ] <= 0
                                          }
                                        >
                                          Reorder
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          "No Dinner scheduled"
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No subscription data available
                </td>
              </tr>
            )}
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
  );
};

export default SubscriptionCalender;
