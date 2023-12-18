const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
     res.json({ message: "Welcome to ideas generator!!" });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));