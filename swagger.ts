import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  info: {
    title: "REST API Gama Services", // Title of the documentation
    version: "1.0.0", // Version of the app
    description: "This is the REST API for Gama Service" // short description of the app
  },
  host: `localhost:3000`, // the host or url of the app
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header"
    }
  }

  // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ["./docs/*.yaml"]
};

export default swaggerJSDoc(options);
