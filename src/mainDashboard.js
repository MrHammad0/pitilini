'use client';
import React, { useState, useEffect } from 'react';
import UserDashboard from './user/dashboard';
import CollaboratorDashboard from './collaborator/land';
import AdminDashboard from './admin/adminDash'

export default function Dashboard() {
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Access the user type from localStorage and set it in state
    try {
      const storedUserType = localStorage.getItem('userType');
      setUserType(storedUserType);
    } catch (error) {
      console.error('Error accessing localStorage', error);
    } finally {
      setIsLoading(false); // Set loading to false after attempting to fetch userType
    }
  }, []);

  if (isLoading) {
    // Optionally, you can return a loading indicator while the user type is being determined
    return <div>Loading...</div>;
  }

  if (userType === 'Collaborator') {
    return <CollaboratorDashboard />;
  } else if (userType === 'User') {
    return <UserDashboard />;
  }else if (userType === 'Administrator') {
    return <AdminDashboard />;
  }
   else {
    return <div>No user type found</div>;
  }
}
