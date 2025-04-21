import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationControls from '../../Utils/PaginationControls';
import './MainSubscribedUsers.css';
import { useSidebar } from '../../Sidebar/SidebarContext';

const MainSubscribedUsers = () => {

  const { isOpen } = useSidebar();

  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

  const fetchUserSubscriptions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/subscriptionplan/user-subscriptions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const uniqueData = [...new Set(response.data.data.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
      
      setUserSubscriptions(uniqueData);
      setPagination(prev => ({
        ...prev,
        totalEntries: uniqueData.length,
      }));
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
      toast.error('Failed to load user subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const filteredData = useMemo(() => {
    return selectedMealType === 'all' 
      ? userSubscriptions 
      : userSubscriptions.filter(sub => 
          sub.subscription.mealType === selectedMealType
        );
  }, [userSubscriptions, selectedMealType]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const getValue = (obj, key) => {
        if (key.includes('.')) {
          return key.split('.').reduce((o, i) => o?.[i], obj);
        }
        return obj[key];
      };

      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalEntries: filteredData.length,
      currentPage: 1, 
    }));
  }, [filteredData]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleEntriesPerPageChange = (size) => {
    setPagination(prev => ({
      ...prev,
      entriesPerPage: size,
      currentPage: 1, 
    }));
  };

  const getPaginatedData = () => {
    const { currentPage, entriesPerPage } = pagination;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="management-container">
        <div className="management-header">
          <h2>Subscribed Users</h2>
        </div>

        <div className="pagination-header">
          <div className="entries-per-page">
            <span>Show:</span>
            <select
              value={pagination.entriesPerPage}
              onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
          <div className="filter-section">
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
            >
              <option value="all">All Meal Types</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Combo">Combo</option>
            </select>
          </div>
        </div>

        <div className="management-table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th className="sortable-header" onClick={() => requestSort('user.id')}>
                  S.No {getSortIcon('user.id')}
                </th>
                <th className="sortable-header" onClick={() => requestSort('user.name')}>
                  Name {getSortIcon('user.name')}
                </th>
                <th className="sortable-header" onClick={() => requestSort('subscription.plan')}>
                  Subscription Plan {getSortIcon('subscription.plan')}
                </th>
                <th className="sortable-header" onClick={() => requestSort('subscription.price')}>
                  Price {getSortIcon('subscription.price')}
                </th>
                <th className="sortable-header" onClick={() => requestSort('subscription.mealType')}>
                  Meal Type {getSortIcon('subscription.mealType')}
                </th>
                <th className="sortable-header" onClick={() => requestSort('subscription.duration')}>
                  Days {getSortIcon('subscription.duration')}
                </th>
                <th className="sortable-header" onClick={() => requestSort('startDate')}>
                  Subscribed Date {getSortIcon('startDate')}
                </th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((sub, index) => (
                <tr key={`${sub.user.id}-${sub.subscription.id}-${index}`}>
                  <td>{(pagination.currentPage - 1) * pagination.entriesPerPage + index + 1}</td>
                  <td>
                    <div className="user-info">
                      {sub.user.avatar && (
                        <img 
                          src={sub.user.avatar} 
                          alt={sub.user.name} 
                          className="user-avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                      )}
                      <span>{sub.user.name}</span>
                    </div>
                  </td>
                  <td>{sub.subscription.plan}</td>
                  <td>₹{sub.subscription.price.toLocaleString('en-IN')}</td>
                  <td>{sub.subscription.mealType}</td>
                  <td>{sub.subscription.duration}</td>
                  <td>{formatDate(sub.startDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={Math.ceil(pagination.totalEntries / pagination.entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={pagination.entriesPerPage}
          totalEntries={pagination.totalEntries}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>
    </div>
  );
};

export default MainSubscribedUsers;