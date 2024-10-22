import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ studentId, courseId }) => {
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/payments/', null, {
                params: {
                    etudiantId: studentId,
                    coursId: courseId,
                },
            });
            setMessage(response.data); // Affiche le message de succès
        } catch (error) {
            console.error('Erreur lors du paiement:', error);
            setMessage('Erreur lors du paiement, veuillez réessayer.');
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Payer le cours</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PaymentForm;
