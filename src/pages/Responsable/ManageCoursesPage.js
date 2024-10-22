import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Spinner, 
  Text, 
  VStack, 
  Alert, 
  AlertIcon, 
  StackDivider 
} from '@chakra-ui/react';
import axios from 'axios';
import CourseItem from '../../../src/components/CourseItem'; // Assume you have this component already
import SidebarWithHeader from '../../../src/components/SidebarWithHeader';

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Correct token retrieval
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:8081/api/cours/withtrainersandstudents', config);
        const courseIds = response.data.map(course => course.id);
        localStorage.setItem('courseIds', JSON.stringify(courseIds));
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses. Please make sure you are authorized.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Box p={6} textAlign="center">
          <Spinner size="xl" />
          <Text mt={4}>Loading courses...</Text>
        </Box>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <Box p={6}>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Box>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <Box p={6}>
        <Heading size="lg" mb={6} textAlign="center" color="#DE3163">Course Details</Heading>

        {courses.length === 0 ? (
          <Text fontSize="xl" color="gray.500" textAlign="center">
            No courses available at the moment.
          </Text>
        ) : (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {courses.map(course => (
              <Box key={course.id} p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <CourseItem course={course} students={course.students} />
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </SidebarWithHeader>
  );
};


export default ManageCoursesPage;
