const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

// Load the OpenAPI YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml')); // Make sure the path is correct

const mode = process.env.MODE || 'none';

// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3500, () => {
    console.log('Swagger UI available at http://localhost:3500/api-docs');
});
