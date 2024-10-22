import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = ({ courseId }) => {
    const [paiements, setPaiements] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/payments/course/${courseId}`);
                setPaiements(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des paiements:', error);
            }
        };

        fetchPayments();
    }, [courseId]);

    return (
        <div>
            <h2>Liste des Paiements</h2>
            <ul>
                {paiements.map((paiement) => (
                    <li key={paiement.id}>
                        Montant: {paiement.montant} | Date: {paiement.datePaiement} | Étudiant: {paiement.etudiant.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentList;
