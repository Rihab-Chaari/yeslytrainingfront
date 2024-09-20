import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Spinner, Alert, AlertIcon, Text, Icon } from '@chakra-ui/react';
import { FaUser, FaChalkboardTeacher, FaBook, FaUserCheck } from 'react-icons/fa'; // Import icons
import SidebarWithHeader from '../../components/SidebarWithHeader';

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setError('Token non disponible. Veuillez vous reconnecter.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/api/stats/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (err) {
        if (err.response) {
          setError('Erreur lors de la récupération des statistiques : ' + err.response.data.message);
        } else {
          setError('Erreur lors de la récupération des statistiques.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <SidebarWithHeader>
      <Box p={8}>
        <Heading mb={6}>Statistiques du Centre de Formation</Heading>
        <VStack spacing={6} align="stretch">
          <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
            <Text fontSize="lg" mb={2}><Icon as={FaUser} mr={2} /> Nombre d'étudiants inscrits :</Text>
            <Text fontSize="xl" fontWeight="bold">{stats?.totalStudents || '0'}</Text>
          </Box>
          <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
            <Text fontSize="lg" mb={2}><Icon as={FaChalkboardTeacher} mr={2} /> Nombre de formateurs :</Text>
            <Text fontSize="xl" fontWeight="bold">{stats?.totalTrainers || '0'}</Text>
          </Box>
          <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
            <Text fontSize="lg" mb={2}><Icon as={FaBook} mr={2} /> Nombre de cours :</Text>
            <Text fontSize="xl" fontWeight="bold">{stats?.totalCourses || '0'}</Text>
          </Box>
          <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
            <Text fontSize="lg" mb={2}><Icon as={FaUserCheck} mr={2} /> Total des inscriptions :</Text>
            <Text fontSize="xl" fontWeight="bold">{stats?.totalRegistrations || '0'}</Text>
          </Box>
        </VStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default StatisticsPage;
