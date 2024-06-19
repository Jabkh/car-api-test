import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CarForm = ({ onCarUpdated, selectedCar, onCancel }) => {
    const [id, setId] = useState('');
    const [marque, setMarque] = useState('');
    const [anneeDeFabrication, setAnneeDeFabrication] = useState('');
    const [couleur, setCouleur] = useState('');

    useEffect(() => {
        if (selectedCar) {
            setId(selectedCar.id);
            setMarque(selectedCar.marque);
            setAnneeDeFabrication(selectedCar.anneeDeFabrication);
            setCouleur(selectedCar.couleur);
        } else {
            resetForm();
        }
    }, [selectedCar]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const annee = parseInt(anneeDeFabrication);
        const carId = parseInt(id);
        const car = {
            id : carId,
            marque,
            anneeDeFabrication: annee,
            couleur
        };

        try {
            if (id) {
                // Update existing car
                const response = await axios.put(`http://localhost:8080/ExerciceApi_war_exploded/api/cars/${id}`, car);
                console.log('Updated Car:', response.data);
            } else {
                // Create new car
                const response = await axios.post('http://localhost:8080/ExerciceApi_war_exploded/api/cars', car);
                console.log('Created Car:', response.data);
            }
            onCarUpdated();
            resetForm();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleDelete = async () => {
        if (id) {
            try {
                await axios.delete(`http://localhost:8080/ExerciceApi_war_exploded/api/cars/${id}`);
                console.log('Deleted Car with ID:', id);
                onCarUpdated();
                resetForm();
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
    };

    const handleCancel = () => {
        resetForm();
        if (onCancel) {
            onCancel();
        }
    };

    const resetForm = () => {
        setId('');
        setMarque('');
        setAnneeDeFabrication('');
        setCouleur('');
    };

    return (
        <div>
            <h2>{id ? 'Update Car' : 'Create Car'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMarque">
                    <Form.Label>Marque</Form.Label>
                    <Form.Control
                        type="text"
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                        placeholder="Marque"
                    />
                </Form.Group>
                <Form.Group controlId="formAnneeDeFabrication">
                    <Form.Label>Année de Fabrication</Form.Label>
                    <Form.Control
                        type="number"
                        value={anneeDeFabrication}
                        onChange={(e) => setAnneeDeFabrication(parseInt(e.target.value))}
                        placeholder="Année de Fabrication"
                    />
                </Form.Group>
                <Form.Group controlId="formCouleur">
                    <Form.Label>Couleur</Form.Label>
                    <Form.Control
                        type="text"
                        value={couleur}
                        onChange={(e) => setCouleur(e.target.value)}
                        placeholder="Couleur"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Update Car' : 'Create Car'}
                </Button>
                {id && (
                    <Button variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        Delete
                    </Button>
                )}
                <Button variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default CarForm;
