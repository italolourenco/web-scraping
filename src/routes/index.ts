import { Router } from 'express'

import scraperRouter from './ScraperRouter'
import swaggerRouter from './SwaggerRouter'

const routes = Router()

routes.use('/scraping', scraperRouter)
routes.use('/docs', swaggerRouter)


export default routes
