const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

// Instrada le richieste al User Service (registrazione, login, preferiti)
app.use('/api/auth', createProxyMiddleware({
    target: 'http://user-service:3001',
    changeOrigin: true
}));
app.use('/api/favorites', createProxyMiddleware({
    target: 'http://user-service:3001',
    changeOrigin: true
}));

// Instrada le richieste al Weather Service
app.use('/api/weather', createProxyMiddleware({
    target: 'http://weather-service:3002',
    changeOrigin: true
}));

// Instrada le richieste al Log Service
app.use('/api/log', createProxyMiddleware({
    target: 'http://log-service:3003',
    changeOrigin: true
}));

app.listen(port, () => {
    console.log(`API Gateway in esecuzione sulla porta ${port}`);
});