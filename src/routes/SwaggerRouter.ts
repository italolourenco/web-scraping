import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi  from 'swagger-ui-express'

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

class SwaggerRouter {
    public router: Router

    constructor() {
        this.router = Router()
        this.configRouter()
    }

    private configRouter(): void {
        const specs = swaggerJSDoc(options);
        this.router.use("/", swaggerUi.serve);
        this.router.get("/", swaggerUi.setup(specs, { explorer: true })
);
    }
}

export default SwaggerRouter;


