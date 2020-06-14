import { Router } from 'express'

import scraperRouter from './ScraperRouter'

const routes = Router()

routes.use('/scraping', scraperRouter)


export default routes
