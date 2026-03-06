const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to trust proxy (useful if deploying to Heroku/Render)
app.set('trust proxy', true);

app.get('/', (req, res) => {
    // This grabs the real IP from the header provided by Render's proxy
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    
    // This will print the IP directly to the Render Log dashboard
    console.log(`Connection detected! IP: ${ip}`);
    
    res.redirect('https://www.google.com');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});