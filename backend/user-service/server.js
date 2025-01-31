const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

app.listen(port, () => {
    console.log(`User Service in esecuzione sulla porta ${port}`);
});