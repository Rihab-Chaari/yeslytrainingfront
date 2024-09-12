import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const AddCoursForm = () => {
  // Retrieve the formateur_id from local storage or another source
  const formateurId = localStorage.getItem('formateur_id');
  // Retrieve the token from local storage
  const token = localStorage.getItem('auth_token');

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    duree: '',
    formateur: { id: formateurId } , // Inclure formateur_id dans le state
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/cours', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Inclure le token d'authentification
        }
      });
      toast({
        title: 'Course added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Optionally, reset form or redirect
    } catch (error) {
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
            />
          </FormControl>
          <FormControl id="dateFin" isRequired>
            <FormLabel>End Date</FormLabel>
            <Input
              name="dateFin"
              type="date"
              value={formData.dateFin}
              onChange={handleChange}
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
  );
};

export default AddCoursForm;
