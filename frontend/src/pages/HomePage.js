import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="page-container home">
            <h1>Welcome to the Football Teams App</h1>
            <div className="buttons">
                <Link to="/view-teams" className="card">
                    <h2>View Teams</h2>
                    <p>See all teams in the database.</p>
                </Link>
                <Link to="/add-team" className="card">
                    <h2>Add Team</h2>
                    <p>Add a new team to the list.</p>
                </Link>
                <Link to="/edit-team" className="card">
                    <h2>Edit Team</h2>
                    <p>Update the details of a team.</p>
                </Link>
                <Link to="/view-stats" className="card">
                    <h2>View Stats</h2>
                    <p>Check the stats for a specific year.</p>
                </Link>
                <Link to="/filter-teams" className="card">
                    <h2>Filter Teams</h2>
                    <p>See teams with more than 5 wins.</p>
                </Link>
                <Link to="/average-goals" className="card">
                    <h2>Average Goals</h2>
                    <p>View average goals scored per team.</p>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
