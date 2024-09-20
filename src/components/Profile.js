import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Text,
  Divider,
  Stack,
} from '@chakra-ui/react';
import SidebarWithHeader from './SidebarWithHeader';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isEditing, setIsEditing] = useState(true);
  const [nom, setNom] = useState(user?.nom || '');
  const [prenom, setPrenom] = useState(user?.prenom || '');
  const [age, setAge] = useState(user?.age || '');
  const [specialite, setSpecialite] = useState(user?.specialite || '');
  const [telephone, setTelephone] = useState(user?.telephone || '');
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/auth/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`,
          },
        });
        const fetchedUser = response.data;
        setNom(fetchedUser.nom);
        setPrenom(fetchedUser.prenom);
        setTelephone(fetchedUser.telephone);
        setAge(fetchedUser.age);
        setSpecialite(fetchedUser.specialite);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.id, user.accessToken]);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:8081/api/auth/${user.id}`, {
        nom,
        prenom,
        telephone,
        age,
        specialite,
      }, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
        },
      });

      localStorage.setItem('user', JSON.stringify({ ...user, nom, prenom, telephone, age, specialite }));

      toast({
        title: "Profile updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsEditing(false);
    } catch (error) {
      const message = error.response ? error.response.data.message : "An error occurred.";
      toast({
        title: "Failed to update profile.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          {isEditing ? 'Edit Profile' : 'User Profile'}
        </Heading>
        <Divider mb={4} />

        {isEditing ? (
          <VStack spacing={4} align="stretch">
            <FormControl id="nom">
              <FormLabel>Nom</FormLabel>
              <Input value={nom} onChange={(e) => setNom(e.target.value)} />
            </FormControl>

            <FormControl id="prenom">
              <FormLabel>Prenom</FormLabel>
              <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </FormControl>

            <FormControl id="telephone">
              <FormLabel>Telephone</FormLabel>
              <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </FormControl>

            <FormControl id="age">
              <FormLabel>Age</FormLabel>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </FormControl>

            <FormControl id="specialite">
              <FormLabel>Specialite</FormLabel>
              <Input value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
            </FormControl>

            <Button colorScheme="blue" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </VStack>
        ) : (
          <Box borderWidth={1} borderRadius="lg" padding={4} boxShadow="md">
            <Stack spacing={3}>
              <Text fontWeight="bold">
                <strong>Nom:</strong> {nom}
              </Text>
              <Text fontWeight="bold">
                <strong>Prenom:</strong> {prenom}
              </Text>
              <Text fontWeight="bold">
                <strong>Téléphone:</strong> {telephone}
              </Text>
              <Text fontWeight="bold">
                <strong>Âge:</strong> {age}
              </Text>
              <Text fontWeight="bold">
                <strong>Spécialité:</strong> {specialite}
              </Text>
              <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </SidebarWithHeader>
  );
};

export default Profile;
