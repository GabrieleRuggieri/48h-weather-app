const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const logRoutes = require('./routes/log');

app.use(express.json());
app.use('/api/log', logRoutes);

app.listen(port, () => {
    console.log(`Log Service in esecuzione sulla porta ${port}`);
});