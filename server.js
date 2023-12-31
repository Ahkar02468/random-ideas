const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();
//link to static folder
app.use(express.static(path.join(__dirname, 'public')));

//add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors middleware
app.use(cors({
     origin: ['http://localhost:5000', 'http://localhost:3000'],
     credentials: true
}))

app.get('/', (req, res) => {
     res.json({ message: "Welcome to ideas generator!!" });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));