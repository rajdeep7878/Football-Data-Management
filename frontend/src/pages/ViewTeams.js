import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTeams = () => {
    const [teams, setTeams] = useState([]);

    // Fetch all teams
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/alldata');
                setTeams(response.data);
            } catch (err) {
                console.error('Error fetching teams:', err);
            }
        };
        fetchTeams();
    }, []);

    // Delete a team
    const handleDelete = async (teamName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${teamName}?`);
        if (confirmDelete) {
            try {
                await axios.post(`http://localhost:3000/delete/${teamName}`);
                alert(`${teamName} has been deleted successfully.`);
                // Refresh the list after deletion
                setTeams(teams.filter((team) => team.Team !== teamName));
            } catch (err) {
                console.error('Error deleting team:', err);
                alert('Failed to delete team.');
            }
        }
    };

    return (
        <div className="page-container">
            <h1>View Teams</h1>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Win</th>
                        <th>Draw</th>
                        <th>Loss</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Points</th>
                        <th>Year</th>
                        <th>Actions</th>
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
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(team.Team)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTeams;
