// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-Learning Platform Content Management API',
        description: 'API documentation for the E-Learning Platform Content Management system'
    },
    host: 'http://http://3.70.227.2:5008',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require('./server.js');
    console.log('Swagger documentation generated!');

})

