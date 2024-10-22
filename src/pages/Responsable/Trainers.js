import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Text, Heading, VStack, HStack, Divider, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const Trainers = () => {
  const [students, setStudents] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/auth/trainers', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
          
        });
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching trainings:', error.response);
        toast({
          title: 'Failed to load students.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    fetchStudents();
  }, [toast, token]);

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/auth/trainer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setStudents(students.filter(student => student.id !== id));
      toast({
        title: 'Student deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting student:', error.response);
      toast({
        title: 'Failed to delete student.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      <Box p={8} bg="gray.50" minH="100vh">
        <Heading mb={6} color="#DE3163" textAlign="center">trainers List</Heading>
        <Stack spacing={6}>
          {students.length > 0 ? (
            students.map(student => (
              <Box
                key={student.id}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg='gray.100'
                boxShadow="lg"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <VStack align="start" spacing={4}>
                  <Text fontWeight="bold">Email: <Text as="span" color="gray.600">{student.email}</Text></Text>
                  <Text fontWeight="bold">Nom: <Text as="span" color="gray.600">{student.nom}</Text></Text>
                  <Text fontWeight="bold">Prénom: <Text as="span" color="gray.600">{student.prenom}</Text></Text>
                  <Text fontWeight="bold">Téléphone: <Text as="span" color="gray.600">{student.telephone}</Text></Text>
                  <Text fontWeight="bold">Age: <Text as="span" color="gray.600">{student.age}</Text></Text>
                  <Text fontWeight="bold">Specialite: <Text as="span" color="gray.600">{student.specialite}</Text></Text>
                  <Divider my={4} />
                  <HStack spacing={6}>
                    <Button
                      onClick={() => handleEdit(student.id)}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(student.id)}
                      colorScheme="red"
                      variant="solid"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))
          ) : (
            <Text fontStyle="italic" color="gray.500">No students available.</Text>
          )}
        </Stack>
      </Box>
    </SidebarWithHeader>
  );
};

export default Trainers;
