import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewTeams from './pages/ViewTeams';
import AddTeam from './pages/AddTeam';
import EditTeam from './pages/EditTeam';
import ViewStats from './pages/ViewStats';
import FilterTeams from './pages/FilterTeams';
import AverageGoals from './pages/AverageGoals';

const App = () => {
    return (
        <Router>
            <div>
                {/* Navbar */}
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/view-teams">View Teams</Link></li>
                        <li><Link to="/add-team">Add Team</Link></li>
                        <li><Link to="/edit-team">Edit Team</Link></li>
                        <li><Link to="/view-stats">View Stats</Link></li>
                        <li><Link to="/filter-teams">Filter Teams</Link></li>
                        <li><Link to="/average-goals">Average Goals</Link></li>
                    </ul>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/view-teams" element={<ViewTeams />} />
                    <Route path="/add-team" element={<AddTeam />} />
                    <Route path="/edit-team" element={<EditTeam />} />
                    <Route path="/view-stats" element={<ViewStats />} />
                    <Route path="/filter-teams" element={<FilterTeams />} />
                    <Route path="/average-goals" element={<AverageGoals />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
