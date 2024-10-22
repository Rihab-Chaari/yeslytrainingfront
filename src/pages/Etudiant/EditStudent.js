import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/auth/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student:', error.response);
        toast({
          title: 'Failed to load student details.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        navigate('/students'); // Redirect to students list on error
      }
    };

    fetchStudent();
  }, [id, token, toast, navigate]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdateStudent = async () => {
    try {
      await axios.put(`http://localhost:8081/api/auth/${id}`, student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: 'Student updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/students'); // Redirect to students list after update
    } catch (error) {
      console.error('Error updating student:', error.response);
      toast({
        title: 'Failed to update student.',
        description: error.response.data.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; // Loading state
  }

  return (
    <SidebarWithHeader>
      <Box p={8} bg="gray.50" minH="100vh">
        <Heading mb={6} color="#DE3163" textAlign="center">Edit Student</Heading>
        <Divider mb={4} />
        <VStack spacing={4} align="stretch">
          <FormControl id="nom">
            <FormLabel>Nom</FormLabel>
            <Input
              name="nom"
              value={student.nom || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="prenom">
            <FormLabel>Prénom</FormLabel>
            <Input
              name="prenom"
              value={student.prenom || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="telephone">
            <FormLabel>Téléphone</FormLabel>
            <Input
              name="telephone"
              value={student.telephone || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="age">
            <FormLabel>Âge</FormLabel>
            <Input
              type="number"
              name="age"
              value={student.age || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="specialite">
            <FormLabel>Spécialité</FormLabel>
            <Input
              name="specialite"
              value={student.specialite || ''}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="blue" onClick={handleUpdateStudent}>
            Update Student
          </Button>
        </VStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default EditStudent;
