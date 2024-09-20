import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const EditCourse = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    duree: '',
  });
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/cours/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request header
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching course:', error.response);
        toast({
          title: 'Failed to load course.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCourse();
  }, [id, token, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/cours/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request header
        }
      });
      toast({
        title: 'Course updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/courses');
    } catch (error) {
      console.error('Error updating course:', error.response);
      toast({
        title: 'Failed to update course.',
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
          <Button type="submit" colorScheme="teal">Update Course</Button>
        </Stack>
      </form>
    </Box>
</SidebarWithHeader>
  );
};

export default EditCourse;
