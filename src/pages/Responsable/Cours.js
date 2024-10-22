import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  List,
  ListItem,
  ListIcon,
  Badge,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const Cours = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState({});
  const [stats, setStats] = useState({});

  const token = localStorage.getItem('token');

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date invalide';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Date invalide' : date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:8081/api/cours', config);
        const courseData = response.data;
        setCourses(courseData);

        const paymentRequests = courseData.map(course =>
          axios.get(`http://localhost:8081/api/paiements/course/${course.id}`, config)
        );

        const statsRequests = courseData.map(course =>
          axios.get(`http://localhost:8081/api/cours/${course.id}/stats`, config)
        );

        const paymentResponses = await Promise.all(paymentRequests);
        const statsResponses = await Promise.all(statsRequests);

        const paymentsData = {};
        const statsData = {};
        
        paymentResponses.forEach((res, index) => {
          const courseId = courseData[index].id;
          paymentsData[courseId] = res.data;
        });
        setPayments(paymentsData);

        statsResponses.forEach((res, index) => {
          const courseId = courseData[index].id;
          statsData[courseId] = res.data;
        });
        setStats(statsData);

        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des cours, paiements ou statistiques.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Chargement des cours...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (courses.length === 0) {
    return <Text>Aucun cours disponible</Text>;
  }

  return (
    <SidebarWithHeader>
      <Box p={5}>
        <Heading as="h1" size="lg" mb={6}>Liste des cours</Heading>
        {courses.map(course => (
          <Box key={course.id} borderWidth={1} borderRadius="lg" p={6} mb={5} shadow="md" bg="gray.50">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Heading as="h2" size="md" mb={2}>{course.titre}</Heading>
              <Badge colorScheme="purple" fontSize="sm">{course.duree ? `${course.duree} heures` : 'Durée non spécifiée'}</Badge>
            </Stack>
            <Text fontSize="md" color="gray.600" mb={2}>{course.description}</Text>

            <VStack spacing={3} align="start" mb={4}>
              <Text><strong>Date de début:</strong> {formatDate(course.dateDebut)}</Text>
              <Text><strong>Date de fin:</strong> {formatDate(course.dateFin)}</Text>
            </VStack>

            <Divider my={4} />

            {/* Course Stats */}
            <Text fontWeight="bold">Statistiques du cours :</Text>
            {stats[course.id] && stats[course.id].totalStudents !== undefined ? (
              <Stack direction="row" spacing={6} mt={3}>
                <Box display="flex" alignItems="center">
                  <Icon as={FaUsers} color="blue.500" mr={2} />
                  <Text>Nombre d'étudiants inscrits : {stats[course.id].totalStudents}</Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <Icon as={FaMoneyBillWave} color="green.500" mr={2} />
                  <Text>Nombre d'étudiants ayant payé : {stats[course.id].totalPaidStudents}</Text>
                </Box>
              </Stack>
            ) : (
              <Text>Aucune statistique disponible pour ce cours</Text>
            )}

            <Divider my={4} />

          </Box>
        ))}
      </Box>
    </SidebarWithHeader>
  );
};

export default Cours;
