import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VIP Formalwear API',
      version: '1.0.0',
      description: 'API documentation for VIP Formalwear app',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // 👈 match your actual PORT
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, '../docs/swaggerDocs.ts')], 

};

const swaggerSpec = swaggerJsdoc(options);
console.log(__dirname)

export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
