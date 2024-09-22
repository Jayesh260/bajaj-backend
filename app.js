const express = require('express');
const cors = require('cors');
const app = express();

// Update the CORS configuration
app.use(cors({
    origin: 'https://rest-api-development-app.vercel.app', // Only Vercel URL, without trailing slash
    methods: ['POST', 'GET'],
    credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 3000;

// POST request handler
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate if "data" is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid JSON input format, "data" should be an array'
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestAlphabet = '';

    // Process the input array
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (highestAlphabet === '' || item.toLowerCase() > highestAlphabet.toLowerCase()) {
                highestAlphabet = item;
            }
        }
    });

    res.status(200).json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

// GET request handler
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});