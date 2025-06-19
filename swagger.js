// swagger.js
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "E-Learning Platform Content Management API",
    description:
      "API documentation for the E-Learning Platform Content Management system. This API allows for creating, managing, and delivering educational content, including courses, sections, videos, and exams.",
    contact: {
      name: "API Support",
      url: "https://www.example.com/support",
      email: "support@example.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://18.184.52.10:5008/api/v1/cms",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Courses",
      description: "Endpoints for managing courses",
    },
    {
      name: "Sections",
      description: "Endpoints for managing course sections",
    },
    {
      name: "Videos",
      description: "Endpoints for managing section videos",
    },
    {
      name: "Exams",
      description: "Endpoints for managing exams and questions",
    },
    {
      name: "Moderator",
      description: "Endpoints for content moderation",
    },
    {
      name: "Student",
      description: "Endpoints for student actions",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token in the format 'Bearer <token>'",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  console.log("Swagger documentation generated!");
  // The server is started in the original swagger.js file,
  // but it is recommended to start it with a separate command (e.g. 'npm start')
  // require('./server.js');
});
