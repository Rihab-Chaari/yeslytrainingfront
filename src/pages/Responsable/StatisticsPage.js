import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Heading, VStack, Spinner, Alert, AlertIcon, Text, Icon, SimpleGrid, useColorModeValue 
} from '@chakra-ui/react';
import { FaUser, FaChalkboardTeacher, FaBook, FaUserCheck } from 'react-icons/fa';
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

  const boxBg = useColorModeValue('white', 'gray.800'); // Background color for light/dark mode
  const boxShadow = useColorModeValue('lg', 'dark-lg'); // Shadow effect

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
        <Heading mb={6} textAlign="center" color="#DE3163">
          Statistiques du Centre de Formation
        </Heading>
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          {/* Etudiants */}
          <Box p={6} borderWidth={1} borderRadius="lg" bg={boxBg} boxShadow={boxShadow} _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
            <Text fontSize="lg" mb={2} fontWeight="bold" color="teal.500">
              <Icon as={FaUser} mr={2} /> Nombre d'étudiants inscrits
            </Text>
            <Text fontSize="3xl" fontWeight="extrabold" color="gray.700">
              {stats?.totalStudents || '0'}
            </Text>
          </Box>

          {/* Formateurs */}
          <Box p={6} borderWidth={1} borderRadius="lg" bg={boxBg} boxShadow={boxShadow} _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
            <Text fontSize="lg" mb={2} fontWeight="bold" color="teal.500">
              <Icon as={FaChalkboardTeacher} mr={2} /> Nombre de formateurs
            </Text>
            <Text fontSize="3xl" fontWeight="extrabold" color="gray.700">
              {stats?.totalTrainers || '0'}
            </Text>
          </Box>

          {/* Cours */}
          <Box p={6} borderWidth={1} borderRadius="lg" bg={boxBg} boxShadow={boxShadow} _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
            <Text fontSize="lg" mb={2} fontWeight="bold" color="teal.500">
              <Icon as={FaBook} mr={2} /> Nombre de cours
            </Text>
            <Text fontSize="3xl" fontWeight="extrabold" color="gray.700">
              {stats?.totalCourses || '0'}
            </Text>
          </Box>

          {/* Inscriptions */}
          <Box p={6} borderWidth={1} borderRadius="lg" bg={boxBg} boxShadow={boxShadow} _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}>
            <Text fontSize="lg" mb={2} fontWeight="bold" color="teal.500">
              <Icon as={FaUserCheck} mr={2} /> Total des inscriptions
            </Text>
            <Text fontSize="3xl" fontWeight="extrabold" color="gray.700">
              {stats?.totalRegistrations || '0'}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </SidebarWithHeader>
  );
};

export default StatisticsPage;
