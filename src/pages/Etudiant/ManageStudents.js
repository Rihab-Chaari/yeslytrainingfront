// src/pages/ManageStudents.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  IconButton,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const toast = useToast();

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/auth/students'); // Adjust API URL
        setStudents(response.data);
      } catch (error) {
        toast({
          title: 'Error fetching students.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchStudents();
  }, [toast]);

  // Delete a student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/auth/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      toast({
        title: 'Student deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting student.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" mb={4}>
        <Heading>Manage Students</Heading>
        <Button colorScheme="teal">Add Student</Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
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
                <Stack direction="row" spacing={4}>
                  <IconButton
                    icon={<FiEdit />}
                    aria-label="Edit Student"
                    colorScheme="blue"
                  />
                  <IconButton
                    icon={<FiTrash />}
                    aria-label="Delete Student"
                    colorScheme="red"
                    onClick={() => handleDelete(student.id)}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ManageStudents;
