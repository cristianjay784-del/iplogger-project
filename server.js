const express = require('express');
const app = express();

// Use the port Render assigns, or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to trust Render's proxy
app.set('trust proxy', true);

app.get('/', (req, res) => {
    // Extract the real IP from the header
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress;
    
    // Log the connection to the Render dashboard
    console.log(`Connection detected! IP: ${ip}`);
    
    // Redirect the user
    res.redirect('https://www.google.com');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});