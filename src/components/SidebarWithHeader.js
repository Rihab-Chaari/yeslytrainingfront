// src/components/SidebarWithHeader.js
import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Avatar,
  HStack,
  VStack,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  CloseButton,
  useColorModeValue,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown, FiHome, FiPlus, FiSettings, FiBookOpen, FiUsers, FiClipboard } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const getUser = () => {
  return JSON.parse(localStorage.getItem('user')); // Fetch 'user' object from localStorage
};
// Function to retrieve role from local storage
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Fetch 'user' object from localStorage
  return user?.roles[0]; // Assuming the role is stored as an array and we're interested in the first role
};

const getEtudiantId = () => {
  const user = getUser(); // Fetch user data
  return user?.id; // Assuming the user object has an 'id' property
};

// Function to define link items based on the role
const getLinkItems = (role) => {
  const commonItems = [
    // Add common items here if needed
  ];

  switch (role) {
    case 'ROLE_RESPONSABLE':
      return [
        ...commonItems,
        { name: 'Course Details', icon: FiBookOpen, path: '/Course-Details' },
        { name: 'List Of Students', icon: FiUsers, path: '/students' },
        { name: 'List Of Trainers', icon: FiUsers, path: '/trainers' },
        { name: 'Stats', icon: FiSettings, path: '/stats' },
      ];
    case 'ROLE_FORMATEUR':
      return [
        ...commonItems,
        { name: 'Home', icon: FiHome, path: '/formateur-courses' },
        { name: 'Add Course', icon: FiPlus, path: '/add-course' },
        { name: 'View Courses', icon: FiBookOpen, path: '/courses' },
      
      ];
    case 'ROLE_ETUDIANT':
      return [
        ...commonItems,
        { name: 'View Courses', icon: FiBookOpen, path: '/view-courses' },
        { name: 'My Registrations', icon: FiClipboard, path: '/my-registrations' },
        {name: 'Recommendations', icon: FiClipboard, path: '/recommendations' },
        { name: 'Télécharger mes reçus', icon: FiClipboard, path: `/receipts/${getEtudiantId()}` },
       
      ];
    default:
      return commonItems;
  }
};
const handleLogout = () => {
  localStorage.removeItem('user'); // Clear the user data from local storage
  window.location.href = '/user-selection'; // Redirect to UserSelection page
};

const SidebarContent = ({ onClose, ...rest }) => {
  const role = getUserRole(); // Get the user's role from localStorage
  const items = getLinkItems(role);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        <Image src="/logo1.png" alt="Logo" mb={4} boxSize="175px" mx="auto" />
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Box as={RouterLink} to={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} {...rest}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        {icon && <Icon mr="4" fontSize="16" _groupHover={{ color: 'white' }} as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  // Récupérer l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || 'Guest'; // Si l'utilisateur n'est pas défini, afficher "Guest"
  const role = user?.roles[0] || 'ROLE_UNKNOWN'; // Récupérer le rôle de l'utilisateur

  // Définir le texte à afficher en fonction du rôle
  let roleDisplay;
  switch (role) {
    case 'ROLE_RESPONSABLE':
      roleDisplay = 'Responsable';
      break;
    case 'ROLE_FORMATEUR':
      roleDisplay = 'Formateur';
      break;
    case 'ROLE_ETUDIANT':
      roleDisplay = 'Etudiant';
      break;
    default:
      roleDisplay = 'Unknown Role'; // Si le rôle n'est pas reconnu
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
     <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
       <Image src="/logo.jpg" alt="Logo" boxSize="50px" objectFit="cover" />
     </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} src={'https://example.com/your-avatar.jpg'} />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">{username}</Text> {/* Affiche le nom d'utilisateur */}
                  <Text fontSize="xs" color="gray.600">{roleDisplay}</Text> {/* Affiche le rôle en fonction */}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => {
                localStorage.removeItem('user'); // Supprime l'utilisateur du stockage local
                window.location.href = '/'; // Redirige vers la sélection de l'utilisateur après déconnexion
              }}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};




const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children} {/* This is where the page content will be rendered */}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
