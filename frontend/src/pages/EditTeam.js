import React, { useState } from 'react';
import axios from 'axios';

const EditTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [teamData, setTeamData] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    // Fetch team data by name
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:3000/alldata');
            const team = response.data.find((t) => t.Team.toLowerCase() === teamName.toLowerCase());
            if (team) {
                setTeamData(team);
                setUpdatedData(team); // Initialize the form with the fetched team data
            } else {
                alert('Team not found!');
                setTeamData(null);
            }
        } catch (err) {
            console.error('Error fetching team data:', err);
            alert('Error fetching team data!');
        }
    };

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    // Save updated data
    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:3000/update/${teamName}`, updatedData);
            alert('Team updated successfully!');
        } catch (err) {
            console.error('Error updating team data:', err);
            alert('Error updating team data!');
        }
    };

    return (
        <div className="page-container">
            <h1>Edit Team</h1>
            {/* Search Form */}
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Edit Form (Visible only if team is found) */}
            {teamData && (
                <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Editing: {teamData.Team}</h2>
                    {Object.keys(teamData).map((key) =>
                        key !== '_id' && key !== '__v' && key !== 'Team' ? (
                            <div key={key} className="form-group">
                                <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type="text"
                                    value={updatedData[key]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : null
                    )}
                    <button type="button" onClick={handleSave}>
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditTeam;
