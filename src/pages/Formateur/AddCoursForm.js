import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const AddCoursForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const formateurId = storedUser ? storedUser.id : null;
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    duree: '',
    montant: 0,
    formateur: { id: formateurId },
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    // Validate if formateurId exists
    if (!formateurId) {
      toast({
        title: 'Error',
        description: 'Formateur ID is missing. Please log in again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    // Validate dates
    if (new Date(formData.dateDebut) >= new Date(formData.dateFin)) {
      toast({
        title: 'Invalid date range.',
        description: 'End date must be after start date.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const formattedData = {
      ...formData,
      formateur: { id: formateurId },  // Include the formateur with its ID
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
    };

    try {
      await axios.post('http://localhost:8081/api/cours', formattedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      toast({
        title: 'Course added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        duree: '',
        montant: 0,
        formateur: { id: 3},
      });
      navigate('/courses');
    } catch (error) {
      console.error('Error response:', error.response);
      toast({
        title: 'Failed to add course.',
        description: error.response?.data?.message || 'An error occurred. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); 
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
                type="date"
                value={formData.dateDebut}
                onChange={handleChange}
                placeholder="Enter start date"
              />
            </FormControl>
            <FormControl id="dateFin" isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                name="dateFin"
                type="date"
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
            <FormControl id="montant" isRequired>
              <FormLabel>Montant (DT)</FormLabel>
              <Input
                name="montant"
                type="number"
                value={formData.montant}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Add Course'}
            </Button>
          </Stack>
        </form>
      </Box>
    </SidebarWithHeader>
  );
};

export default AddCoursForm;
