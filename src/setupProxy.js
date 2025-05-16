// src/setupProxy.js (Truly Minimal - Less recommended)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const apiProxy = createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
    });

    app.use((req, res, next) => {
        if (req.path.startsWith('/api')) {
            return apiProxy(req, res, next);
        }
        next();
    });
};