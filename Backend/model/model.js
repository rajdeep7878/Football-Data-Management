const mongoose = require('mongoose');

// Define the schema for your football data
const footballSchema = new mongoose.Schema({
    Team: { type: String, required: true },
    GamesPlayed: { type: Number, required: true },
    Win: { type: Number, required: true },
    Draw: { type: Number, required: true },
    Loss: { type: Number, required: true },
    GoalsFor: { type: Number, required: true },
    GoalsAgainst: { type: Number, required: true },
    Points: { type: Number, required: true },
    Year: { type: Number, required: true },
});

// Use the original collection name `dbs` to avoid renaming the database
const data = mongoose.model('dbs', footballSchema);

module.exports = data;
