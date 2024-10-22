import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, List, ListItem, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import SidebarWithHeader from '../../components/SidebarWithHeader';

const ReceiptDownload = () => {
    const [paiements, setPaiements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const etudiantId = user ? user.id : null;

    // Fetch payments on component mount
    useEffect(() => {
        const fetchPaiements = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`http://localhost:8081/api/receipts/student/${etudiantId}/receipts`, config);
                setPaiements(response.data);
            } catch (error) {
                setError('Error fetching payments. Please try again later.');
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        if (etudiantId) {
            fetchPaiements();
        }
    }, [etudiantId]);

    // Fetch the selected receipt
    const fetchReceipt = async (paiementId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob', // Set response type to blob for PDF
            };

            const response = await axios.get(`http://localhost:8081/api/receipts/download/${paiementId}`, config);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt_${paiementId}.pdf`); // Dynamic file name based on payment ID
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError('Error downloading receipt. Please try again.');
            console.error('Error fetching receipt:', error);
        }
    };

    return (
        <SidebarWithHeader>
        <Box p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
            <Heading as="h2" size="lg" mb={4} textAlign="center">Your Payments</Heading>
            {loading ? (
                <Spinner size="xl" color="blue.500" />
            ) : error ? (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            ) : (
                <List spacing={3}>
                    {paiements.length > 0 ? (
                        paiements.map(paiement => (
                            <ListItem key={paiement.id} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px" borderColor="gray.200" p={2}>
                                <Text>{`Paiement ID: ${paiement.id}, Montant: ${paiement.montant} DT`}</Text>
                                <Button 
                                    colorScheme="blue" 
                                    onClick={() => fetchReceipt(paiement.id)}
                                >
                                    Download Receipt
                                </Button>
                            </ListItem>
                        ))
                    ) : (
                        <Text textAlign="center" color="gray.500">No payments found.</Text>
                    )}
                </List>
            )}
        </Box>
        </SidebarWithHeader>
    );
};

export default ReceiptDownload;
