import React, { useState, useEffect } from 'react'; 
import { Box, Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const AddCoursForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // Retrieve user data from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const formateurId = storedUser ? storedUser.id : null;
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    console.log("Formateur ID:", formateurId); // Check if it's retrieved properly
  }, [formateurId]);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    duree: '',
    formateur: { id: formateurId },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format: dd/MM/yyyy
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Token:', token); // Check if token is properly retrieved

    // Format dates before sending
    const formattedData = {
      ...formData,
      dateDebut: formatDate(formData.dateDebut),
      dateFin: formatDate(formData.dateFin),
    };

    try {
      await axios.post('http://localhost:8081/api/cours', formattedData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request header
        }
      });
      toast({
        title: 'Course added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/courses');
    } catch (error) {
      console.error('Error response:', error.response); // Log error response
      toast({
        title: 'Failed to add course.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      <Box p="6">
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <FormControl id="titre" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Enter course title"
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
              />
            </FormControl>
            <FormControl id="dateDebut" isRequired>
              <FormLabel>Start Date</FormLabel>
              <Input
                name="dateDebut"
                type='date'
                value={formData.dateDebut}
                onChange={handleChange}
                placeholder="Enter start date"
              />
            </FormControl>
            <FormControl id="dateFin" isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                name="dateFin"
                type='date'
                value={formData.dateFin}
                onChange={handleChange}
                placeholder="Enter end date"
              />
            </FormControl>
            <FormControl id="duree" isRequired>
              <FormLabel>Duration (hours)</FormLabel>
              <Input
                name="duree"
                type="number"
                value={formData.duree}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">Add Course</Button>
          </Stack>
         
        </form>
      </Box>
    </SidebarWithHeader>
  );
};

export default AddCoursForm;
