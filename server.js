const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy middleware
app.use('/proxy', createProxyMiddleware({
    target: '', // The target URL will be dynamically set
    changeOrigin: true,
    router: req => {
        const target = req.query.url;
        return target;
    },
    pathRewrite: {
        '^/proxy': '', // remove /proxy from the request path
    },
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
