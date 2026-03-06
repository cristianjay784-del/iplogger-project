const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// This is the CRITICAL line for Render
app.set('trust proxy', true);

app.get('/', (req, res) => {
    // Extract the real IP from the header
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    
    // Log the connection to the Render dashboard
    console.log(`Connection detected! IP: ${ip}`);
    
    // Instead of redirecting, just send text to confirm it's working
    res.send('Server is working! Your IP has been logged.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});