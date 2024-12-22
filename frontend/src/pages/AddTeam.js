import React, { useState } from 'react';
import axios from 'axios';

const AddTeam = () => {
    const [formData, setFormData] = useState({
        Team: '',
        GamesPlayed: '',
        Win: '',
        Draw: '',
        Loss: '',
        GoalsFor: '',
        GoalsAgainst: '',
        Points: '',
        Year: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/add', formData);
            alert('Team added successfully!');
            setFormData({
                Team: '',
                GamesPlayed: '',
                Win: '',
                Draw: '',
                Loss: '',
                GoalsFor: '',
                GoalsAgainst: '',
                Points: '',
                Year: '',
            });
        } catch (err) {
            console.error('Error adding team:', err);
            alert('Failed to add team!');
        }
    };

    return (
        <div className="page-container">
            <h1>Add Team</h1>
            <form className="form" onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                    />
                ))}
                <button type="submit">Add Team</button>
            </form>
        </div>
    );
};

export default AddTeam;
