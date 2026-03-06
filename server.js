const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to trust proxy (useful if deploying to Heroku/Render)
app.set('trust proxy', true);

app.get('/', (req, res) => {
    // Correctly get the user's real public IP address
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    
    // Log directly to the Render dashboard
    console.log(`Connection from IP: ${ip} at ${new Date().toISOString()}`);
    
    // Redirect the user
    res.redirect('https://www.google.com');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});