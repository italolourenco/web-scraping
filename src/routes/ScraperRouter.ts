import { Router } from 'express'
import ScraperService from '../services/ScraperService'

const scraperRouter = Router()

const GIT_HUB_PATH = 'https://github.com'

scraperRouter.get('/:username/:repositoryname', async (request, response) => {
    const { username, repositoryname } = request.params

    await ScraperService.execute(username, repositoryname)

    return response.status(200).json({message : 'OK'})

})

export default scraperRouter
