import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const DashboardFormateur = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleAddCourseClick = () => {
    navigate('/add-course'); // Redirect to the Add Course page
  };

  return (
    <SidebarWithHeader>
      <Box p="6">
        <Heading>Formateur Dashboard</Heading>
        <Button colorScheme="teal" mt="4" onClick={handleAddCourseClick}>
          Add New Course
        </Button>
      </Box>
    </SidebarWithHeader>
  );
};

export default DashboardFormateur;
