import express = require("express");
const SwaggerRouter = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Github Web Scraping API",
            version: "1.0.0",
            description:
                "Information about the number of lines and bytes of each file extension in a github repository",
            contact: {
                name: "Italo Lourenço",
                email: "italolt10@gmail.com"
            }
        }
    },
    apis: [
        "./dist/src/routes/ScraperRouter.js",
        "./dist/src/models/ExtensionResume.js",
    ]
};

const specs = swaggerJsdoc(options);
SwaggerRouter.use("/", swaggerUi.serve);
SwaggerRouter.get(
    "/",
    swaggerUi.setup(specs, {
        explorer: true
    })
);

export default SwaggerRouter;