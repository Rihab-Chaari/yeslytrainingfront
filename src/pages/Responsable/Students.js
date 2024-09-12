// src/pages/Responsable/Students.js
import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const Students = () => {
  const students = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  return (
    <Box p={5}>
      <Heading mb={5}>Gestion des étudiants</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nom</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student.id}>
              <Td>{student.id}</Td>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>
                <Button colorScheme="teal" mr={2}>Voir</Button>
                <Button colorScheme="red">Supprimer</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Students;
