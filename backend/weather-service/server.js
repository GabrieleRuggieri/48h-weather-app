const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

const weatherRoutes = require('./routes/weather');

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(port, () => {
    console.log(`Weather Service in esecuzione sulla porta ${port}`);
});
