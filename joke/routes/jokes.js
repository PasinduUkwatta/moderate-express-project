const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');
const axios = require('axios');
const { verifyToken } = require('../middleware/authMiddleware');
const cors = require('cors');

router.use(cors());

router.get('/jokes',verifyToken,async (req, res) => {
    try {
        const jokes = await Joke.find();
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/jokes/latest', verifyToken,async (req, res) => {
    try {
        const latestJoke = await Joke.findOne().sort({ _id: -1 });

        if (!latestJoke) {
            return res.status(404).json({ message: 'No jokes found' });
        }

        res.json(latestJoke);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/jokes/latest/update', verifyToken,async (req, res) => {
    const { _id, jokeType, joke } = req.body;

    try {

        const nestJsUrl = 'http://127.0.0.1:5000/api/jokes/add';
        const jokeData = { jokeType, joke };

        const response = await axios.post(nestJsUrl, jokeData);
        const { id } = response.data;

        res.json({ message: 'Joke updated and added successfully in MySql', insertedId: id });
    } catch (error) {
        console.error('Error calling NestJS endpoint:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.post('/jokes/delete', verifyToken,async (req, res) => {
    const { _id } = req.body;

    try {
        const deletedJoke = await Joke.findByIdAndDelete(_id);

        if (!deletedJoke) {
            return res.status(404).json({ message: 'Joke not found' });
        }

        const nextLatestJoke = await Joke.findOne().sort({ _id: -1 });

        res.json({
            message: 'Joke deleted successfully',
            deletedJoke,
            nextLatestJoke
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
