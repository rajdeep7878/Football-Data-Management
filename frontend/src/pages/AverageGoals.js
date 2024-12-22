import React, { useState } from 'react';
import axios from 'axios';

const AverageGoals = () => {
    const [year, setYear] = useState('');
    const [teams, setTeams] = useState([]);

    const handleFetchAverage = async () => {
        if (!year || isNaN(year)) {
            alert('Please enter a valid year!');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/average/${year}`);
            setTeams(response.data);
        } catch (err) {
            console.error('Error fetching average goals:', err);
            alert('Error fetching average goals!');
        }
    };

    return (
        <div className="page-container">
            <h1>Average Goals</h1>
            <div className="form-container">
                <input
                    type="number"
                    placeholder="Enter Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button onClick={handleFetchAverage}>Fetch Average Goals</button>
            </div>
            {teams.length > 0 && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Games Played</th>
                                <th>Wins</th>
                                <th>Draws</th>
                                <th>Losses</th>
                                <th>Goals For</th>
                                <th>Goals Against</th>
                                <th>Points</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => (
                                <tr key={index}>
                                    <td>{team.Team}</td>
                                    <td>{team.GamesPlayed}</td>
                                    <td>{team.Win}</td>
                                    <td>{team.Draw}</td>
                                    <td>{team.Loss}</td>
                                    <td>{team.GoalsFor}</td>
                                    <td>{team.GoalsAgainst}</td>
                                    <td>{team.Points}</td>
                                    <td>{team.Year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AverageGoals;
