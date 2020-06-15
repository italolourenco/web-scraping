import { Router } from 'express'

import ScraperRouter from './ScraperRouter'
import swaggerRouter from './SwaggerRouter'

const routes = Router()

routes.use('/scraping', new ScraperRouter().router)
routes.use('/docs', swaggerRouter)


export default routes
