import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';


const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:4000/get-checktoken", {
        method: "GET",
        credentials: "include" // Sending cookies along with the request
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const isAuthenticated = data.message;
  
      setAuth(isAuthenticated === 'You are authenticated');
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className='loadingPage flex'>
        <div className='loading'>Loading</div>
      </div>
    );
  }
  
  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
export default ProtectedRoute;