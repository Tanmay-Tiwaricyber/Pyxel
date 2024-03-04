const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.text());

app.post('/runcode', (req, res) => {
    const code = req.body;

    // Save the Python code to a temporary file
    const fs = require('fs');
    fs.writeFileSync('temp.py', code);

    // Execute the Python code
    exec('python temp.py', (error, stdout, stderr) => {
        if (error) {
            res.send(stderr);
        } else {
            res.send(stdout);
        }
    });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
