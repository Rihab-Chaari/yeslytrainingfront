import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const Home = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTrainers: 0,
    totalCourses: 0,
    totalRegistrations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats'); // Ensure this endpoint is correct
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <SidebarWithHeader>
      <Box p={4}>
        <Heading mb={6}>Dashboard</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <Stat>
            <StatLabel>Total Students</StatLabel>
            <StatNumber>{stats.totalStudents}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Total Trainers</StatLabel>
            <StatNumber>{stats.totalTrainers}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Total Courses</StatLabel>
            <StatNumber>{stats.totalCourses}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Total Registrations</StatLabel>
            <StatNumber>{stats.totalRegistrations}</StatNumber>
          </Stat>
        </SimpleGrid>
        <Box mt={6}>
          <Heading size="md" mb={4}>Other Functionalities</Heading>
          <Button colorScheme="blue" mr={4}>Manage Courses</Button>
          <Button colorScheme="green" mr={4}>Manage Students</Button>
          <Button colorScheme="teal">Manage Trainers</Button>
        </Box>
      </Box>
    </SidebarWithHeader>
  );
};

export default Home;
