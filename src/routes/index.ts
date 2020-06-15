import { Router } from 'express'

import ScraperRouter from './ScraperRouter'
import SwaggerRouter from './SwaggerRouter'

const routes = Router()

routes.use('/scraping', new ScraperRouter().router)
routes.use('/docs', new SwaggerRouter().router)


export default routes
