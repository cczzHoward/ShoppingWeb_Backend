const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'ShoppingWeb API',
      description: 'All API endpoints for ShoppingWeb',
    },
    host: 'localhost:8080',
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "JWT token for authentication"
      }
    }
};

const outputFile = './swagger-config.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc);