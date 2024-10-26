import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  Icon,
  VStack,
  useColorModeValue,
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

  const bgColor = useColorModeValue('white', 'gray.800'); // Background color for light/dark mode
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900'); // Text color
  const headingColor = "#DE3163"; // Main heading color
  const accentColors = ['#FFB74D', '#4CAF50', '#00BCD4']; // Accent colors for the cards

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
      <Box p={8} bg={bgColor} borderRadius="md" boxShadow="lg">
        <Heading mb={8} textAlign="center" color={headingColor}>
          Statistiques du Centre de Formation
        </Heading>
        
        <VStack spacing={6} align="stretch"> {/* Utilisation de VStack pour empiler les cartes */}
          {/* Etudiants */}
          <StatisticCard
            icon={FaUser}
            title="Nombre d'étudiants inscrits"
            value={stats?.totalStudents || '0'}
            bgColor={accentColors[0]}
            textColor={textColor}
          />
          
          {/* Formateurs */}
          <StatisticCard
            icon={FaChalkboardTeacher}
            title="Nombre de formateurs"
            value={stats?.totalTrainers || '0'}
            bgColor={accentColors[1]}
            textColor={textColor}
          />
          
          {/* Cours */}
          <StatisticCard
            icon={FaBook}
            title="Nombre de cours"
            value={stats?.totalCourses || '0'}
            bgColor={accentColors[2]}
            textColor={textColor}
          />
          
          {/* Inscriptions */}
          <StatisticCard
            icon={FaUserCheck}
            title="Total des inscriptions"
            value={stats?.totalRegistrations || '0'}
            bgColor={headingColor}
            textColor="white"
          />
        </VStack>
      </Box>
    </SidebarWithHeader>
  );
};

const StatisticCard = ({ icon, title, value, bgColor, textColor }) => {
  return (
    <Box
      p={6}
      borderRadius="lg"
      bg={bgColor}
      color={textColor}
      boxShadow="md"
      transition="0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Icon as={icon} boxSize={10} mb={4} />
      <Text fontSize="lg" fontWeight="bold">{title}</Text>
      <Text fontSize="3xl" fontWeight="extrabold" mt={2}>{value}</Text>
    </Box>
  );
};

export default StatisticsPage;
