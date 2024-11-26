const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'ShoppingWeb API',
      description: 'All API endpoints for ShoppingWeb',
    },
    host: 'localhost:8080'
};

const outputFile = './swagger-config.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc);