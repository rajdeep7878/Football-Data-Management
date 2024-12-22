const express = require('express');
const cors = require('cors');
const connectDB = require('./model/db/db');
const dotenv = require('dotenv');
const data = require('./model/model');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

// Connect to the database
connectDB();

// Get all data
app.get('/alldata', async (req, res) => {
    try {
        const Database = await data.find({});
        res.status(200).json(Database);
    } catch (err) {
        res.status(500).json({ Message: err.message });
    }
});

// Add a new record
app.post('/add', async (req, res) => {
    console.log('Request Body:', req.body); // Debug log
    try {
        const newData = new data(req.body);
        await newData.save();
        res.status(201).json(newData);
    } catch (err) {
        console.error('Validation Error:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Update a record
app.post('/update/:team', async (req, res) => {
    try {
        const updatedData = await data.findOneAndUpdate(
            { Team: req.params.team },
            req.body,
            { new: true }
        );
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a record
app.post('/delete/:team', async (req, res) => {
    try {
        await data.deleteOne({ Team: req.params.team });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Stats by year
app.get('/stats/:year', async (req, res) => {
    try {
        const stats = await data.aggregate([
            { $match: { Year: parseInt(req.params.year) } },
            {
                $group: {
                    _id: null,
                    totalGames: { $sum: '$GamesPlayed' },
                    totalWins: { $sum: '$Win' },
                    totalDraws: { $sum: '$Draw' },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Filter teams by minimum wins
app.get('/filter/:wins', async (req, res) => {
    try {
        const minWins = parseInt(req.params.wins);
        const filteredTeams = await data.find({ Win: { $gt: minWins } });
        res.status(200).json(filteredTeams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Average goals by year
app.get('/average/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        const teams = await data.find({ Year: year }); // Fetch all teams for the year
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));
