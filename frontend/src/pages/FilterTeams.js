import React, { useState } from 'react';
import axios from 'axios';

const FilterTeams = () => {
    const [wins, setWins] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);

    const handleFilter = async () => {
        if (!wins || isNaN(wins)) {
            alert('Please enter a valid number!');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/filter/${wins}`);
            setFilteredTeams(response.data.slice(0, 10)); // Limit to 10 rows
        } catch (err) {
            console.error('Error filtering teams:', err);
            alert('Error filtering teams!');
        }
    };

    return (
        <div className="page-container">
            <h1>Filter Teams</h1>
            <div className="form-container">
                <input
                    type="number"
                    placeholder="Enter minimum wins"
                    value={wins}
                    onChange={(e) => setWins(e.target.value)}
                />
                <button onClick={handleFilter}>Filter Teams</button>
            </div>
            {filteredTeams.length > 0 && (
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
                            {filteredTeams.map((team, index) => (
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

export default FilterTeams;
