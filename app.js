const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./joke/routes/authRoutes');
const jokesRouter = require('./joke/routes/jokes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;

const mysql = require('mysql');
app.use(express.json());


// MongoDB connection
const mongodbUri = process.env.MONGODB_URI;
mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); // Parse JSON bodies
app.use('/api', jokesRouter); // Mount jokes router
app.use('/api/auth', authRouter); // Authentication routes


app.listen(port, () => {
    console.log(`Server is running on  port : ${port}`);
});
