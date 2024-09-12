// src/pages/Etudiant/DashboardEtudiant.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const DashboardEtudiant = () => {
  return (
    <SidebarWithHeader>
      <Box p="6">
        <Heading>Etudiant Dashboard</Heading>
        <Text>Your enrolled courses will appear here.</Text>
      </Box>
    </SidebarWithHeader>
  );
};

export default DashboardEtudiant;
