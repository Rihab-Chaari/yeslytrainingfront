import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Box, Heading, Button } from '@chakra-ui/react';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const MyRegistrations = () => {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const etudiantId = user ? user.id : null;

  const handlePayment = async (coursId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:8081/api/paiements/pay', null, {
        params: {
          etudiantId: etudiantId,
          coursId: coursId,
        },
        ...config,
      });

      alert(`Paiement effectué avec succès !`);
    } catch (error) {
      if (error.response) {
        alert(` ${error.response.data}`);
      } else {
        alert('Erreur lors du paiement, veuillez réessayer.');
      }
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (!etudiantId) {
        console.error("Etudiant ID is missing");
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:8081/api/inscriptions/student/${etudiantId}/cours-registrations`, config);
        setCourses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    };

    fetchCourses();
  }, [etudiantId]);

  return (
    <SidebarWithHeader>
      <div>
        <Heading mb={6}>My Courses</Heading>
        {courses.length > 0 ? (
          <div>
            {courses.map((course) => (
              <div key={course.id}>
                <Box p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="md">
                  <Heading size="md">{course.titre || 'No title'}</Heading>
                  <Text mt={2}>{course.description || 'No description'}</Text>
                  <Text mt={2}>Montant: {course.montant ? `${course.montant} DT` : 'Not specified'}</Text>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={() => handlePayment(course.id)}
                    isDisabled={course.statutPaiement === 'PAYE'} // Disable if already paid
                  >
                    {course.statutPaiement === 'PAYE' ? 'Déjà payé' : 'Payer'}
                  </Button>
                </Box>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses registered.</p>
        )}
      </div>
    </SidebarWithHeader>
  );
};

export default MyRegistrations;
