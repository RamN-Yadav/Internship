import React, { useEffect, useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";  // Import toastify components
import "react-toastify/dist/ReactToastify.css";  // Import toastify styles

const NotificationBadge = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const unreadNotifications = data.notifications.filter((notif) => !notif.read);
        setUnreadCount(unreadNotifications.length);

        // Show success toast if there are new unread notifications
        if (unreadNotifications.length > 0) {
          toast.success(`${unreadNotifications.length} new notification(s)`);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err.message);
        setError('Failed to load notifications. Please try again later.');
        toast.error("Error fetching notifications");
      }
    };

    fetchNotifications();
  }, []);

  const handleIconClick = () => {
    setUnreadCount(0); // Clear the unread count on icon click
  };

  return (
    <div className="relative inline-block">
      <span
        className="text-yellow-500 hover:text-red-500 cursor-pointer transition-all"
        onClick={handleIconClick}
      >
        <IoNotifications
          className="inline-block mr-2 transition-transform transform hover:scale-110 duration-200 ease-in-out"
          size={28}
        />
      </span>
      {unreadCount > 0 && (
        <span className="absolute bottom-2 right-0 bg-red-600 text-white rounded-full text-xs font-bold px-2 py-1">
          {unreadCount}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        style={{
          right: "20px",
          left: "auto",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "18px",
          width: "400px",
          padding: "20px",
        }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default NotificationBadge;