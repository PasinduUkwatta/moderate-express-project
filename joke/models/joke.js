const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    jokeType: { type: String, required: true },
    joke: { type: String, required: true },
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;
