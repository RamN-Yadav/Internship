import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io( "http://localhost:7000");

    // Listen for new notifications via WebSocket
    socket.on("deadlineUpdated", (newNotification) => {
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data.notifications);

        // Count unread notifications
        const unread = data.notifications.filter((notif) => !notif.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await fetch(`http://localhost:7000/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );

      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError('Could not mark notification as read');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        <span className="ml-2">Loading notifications...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Notifications 
        {unreadCount > 0 && (
          <span className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded-full">
            {unreadCount}
          </span>
        )}
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="divide-y divide-gray-200" aria-live="polite">
          {notifications.map((notif) => (
            <li 
              key={notif._id} 
              className={`p-4 ${
                notif.read ? 'bg-gray-100' : 'bg-yellow-50'
              } rounded-lg shadow-md mb-2 transition-all transform hover:scale-105`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{notif.message}</p>
                  {notif.feedback && (
                    <p className="text-sm text-blue-600 mt-1"><strong>Feedback:</strong> {notif.feedback}</p>
                  )}
                  <span className="block text-sm text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
                {!notif.read && (
                  <button 
                    onClick={() => handleMarkAsRead(notif._id)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;