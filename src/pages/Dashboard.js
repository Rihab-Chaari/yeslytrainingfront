// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Assuming you store the role during login

    if (!token) {
      navigate('/login');
    } else {
      if (role === 'ROLE_FORMATEUR') {
        navigate('/dashboard/formateur');
      } else if (role === 'ROLE_ETUDIANT') {
        navigate('/dashboard/etudiant');
      }
    }
  }, [navigate]);

  return <Box>Redirecting...</Box>;
};

export default Dashboard;
