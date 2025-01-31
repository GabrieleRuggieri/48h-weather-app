const axios = require('axios');

exports.getWeather = async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ message: 'Il parametro city è obbligatorio' });
    }
    // Imposta la tua API key di OpenWeatherMap come variabile d'ambiente oppure sostituisci 'your_api_key_here'
    const apiKey = process.env.OPENWEATHER_API_KEY || 'your_api_key_here';
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore nel recupero dei dati meteo', error: error.toString() });
    }
};
