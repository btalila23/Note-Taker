const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
});

app.listen(port, () =>{ 
    console.log(`Example app listening on port ${port}!`)
});