const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to trust proxy (useful if deploying to Heroku/Render)
app.set('trust proxy', true);

app.get('/', (req, res) => {
    // Capture the IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] IP: ${ip}\n`;

fs.appendFile('logs.txt', logEntry, (err) => {
    if (err) console.log('Error writing to file:', err);
    else console.log('Successfully logged IP to file!');
});
    res.redirect('https://www.google.com');
    console.log(`Logged connection from: ${ip}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});