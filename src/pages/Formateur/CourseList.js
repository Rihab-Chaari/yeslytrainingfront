import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/cours', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request header
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error.response);
        toast({
          title: 'Failed to load courses.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCourses();
  }, [toast, token]);

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`); // Redirect to the edit page for the selected course
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/cours/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request header
        }
      });
      setCourses(courses.filter(course => course.id !== id));
      toast({
        title: 'Course deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting course:', error.response);
      toast({
        title: 'Failed to delete course.',
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
      <Stack spacing="4">
        {courses.map(course => (
          <Box key={course.id} borderWidth="1px" borderRadius="md" p="4">
            <Text fontSize="lg" fontWeight="bold">{course.titre}</Text>
            <Text>Description: {course.description}</Text>
            <Text>Start Date: {course.dateDebut}</Text>
            <Text>End Date: {course.dateFin}</Text>
            <Text>Duration: {course.duree} hours</Text>
            <Button onClick={() => handleEdit(course.id)} colorScheme="blue" mr="4">
              Edit
            </Button>
            <Button onClick={() => handleDelete(course.id)} colorScheme="red">
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
</SidebarWithHeader>
  );
};

export default CourseList;
