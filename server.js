const express = require('express');
const port = 5000;


const app = express();

app.get('/', (req, res) => {
     res.json({ message: "Welcome to ideas generator!!" });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));