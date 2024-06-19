import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const CarList = ({ onCarSelected }) => {
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:8080/ExerciceApi_war_exploded/api/cars');
            setCars(response.data);
        } catch (error) {
            console.error('There was an error fetching the cars!', error);
        }
    };

    const handleUpdate = (carId) => {
        const carToUpdate = cars.find(car => car.id === carId);
        onCarSelected(carToUpdate);
    };

    

    const handleDelete = async (carId) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await axios.delete(`http://localhost:8080/ExerciceApi_war_exploded/api/cars/${carId}`);
                setCars(cars.filter(car => car.id !== carId));
                console.log(`Deleted car with ID: ${carId}`);
            } catch (error) {
                console.error('There was an error deleting the car!', error);
            }
        }
    };

    const handleDetails = (carId) => {
        const carToView = cars.find(car => car.id === carId);
        setCurrentCar(carToView);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <h2>Car List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Marque</th>
                        <th>Année de Fabrication</th>
                        <th>Couleur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.marque}</td>
                            <td>{car.anneeDeFabrication}</td>
                            <td>{car.couleur}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleUpdate(car.id)}>Update</Button>
                                <Button variant="info" onClick={() => handleDetails(car.id)}>Details</Button>
                                <Button variant="danger" onClick={() => handleDelete(car.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Car Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentCar && (
                    <div>
                        <p>Marque: {currentCar.marque}</p>
                        <p>Année de Fabrication: {currentCar.anneeDeFabrication}</p>
                        <p>Couleur: {currentCar.couleur}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default CarList;
