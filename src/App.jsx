import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarForm from './component/CarForm';
import CarList from './component/CarList';

const App = () => {
    const [selectedCar, setSelectedCar] = useState(null);

    const handleCarUpdated = () => {
        // Reset selected car after update
        setSelectedCar(null);
        // Optionally, refresh the car list (if necessary)
    };

    const handleCarSelected = (car) => {
        setSelectedCar(car);
    };

    return (
        <div className="container">
            <h1>Car Management</h1>
            <CarForm onCarUpdated={handleCarUpdated} selectedCar={selectedCar} />
            <CarList onCarSelected={handleCarSelected}  selectedCar={selectedCar}/>
        </div>
    );
};

export default App;
