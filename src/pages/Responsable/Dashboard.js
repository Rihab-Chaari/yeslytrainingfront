import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <SidebarWithHeader>
      <Box p="6">
        <Heading>Welcome to the Dashboard</Heading>
      </Box>
    </SidebarWithHeader>
  );
};

export default Dashboard;
