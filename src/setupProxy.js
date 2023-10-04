const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(

    '/api',

    createProxyMiddleware({

      target: 'https://admin-api-stage.qrooto.com',
      changeOrigin: true,
    })
    
  );
  
};
