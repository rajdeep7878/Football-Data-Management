import React, { useState } from 'react';
import axios from 'axios';

const ViewStats = () => {
    const [year, setYear] = useState('');
    const [stats, setStats] = useState(null);

    const handleFetchStats = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/stats/${year}`);
            setStats(response.data[0]);
        } catch (err) {
            console.error('Error fetching stats:', err);
            alert('Error fetching stats!');
        }
    };

    return (
        <div className="page-container">
            <h1>View Stats</h1>
            <input
                type="text"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <button onClick={handleFetchStats}>Fetch Stats</button>
            {stats && (
                <div>
                    <h2>Stats for {year}</h2>
                    <p>Total Games: {stats.totalGames}</p>
                    <p>Total Wins: {stats.totalWins}</p>
                    <p>Total Draws: {stats.totalDraws}</p>
                </div>
            )}
        </div>
    );
};

export default ViewStats;
