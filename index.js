const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("This is the root route");
});

app.listen(port, () => {
    console.log(`Backend Server is running at http://localhost:${port}`);
})