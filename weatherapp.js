const express = require('express');
const request = require('request');
const app = express();
const port = 8002; // You can choose any available port

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.urlencoded({ extended: true }));

app.post('/weather', (req, res) => {
    const city = req.body.city; // Get the city from the form
    const apiKey = 'da0f9c8d90bde7e619c3ec47766a42f4'; // Replace with your API key

    const options = {
        method: 'GET',
        url: 'https://openweather43.p.rapidapi.com/weather',
        qs: {
            q: city, // Use the city obtained from the form
            appid: apiKey,
            units: 'standard',
        },
        headers: {
            'X-RapidAPI-Key': '54ad3b9c1fmsh3b9ff9aeda02dc6p15f8d1jsn48eaae48c02e',
            'X-RapidAPI-Host': 'openweather43.p.rapidapi.com',
        },
    };

    request(options, function (error, response, body) {
        if (error) {
            res.status(500).send('An error occurred.');
        } else {
            const data = JSON.parse(body);
            if (response.statusCode === 200) {
                const temperature = data.temperature; // Replace with the actual property name
                const description = data.description; // Replace with the actual property name
                res.sendFile(__dirname + '/views/index.html', { temperature, description });
            } else {
                res.status(response.statusCode).send('API request failed.');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
