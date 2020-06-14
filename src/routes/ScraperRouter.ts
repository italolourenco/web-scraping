import { Router } from 'express'

const scraperRouter = Router()

scraperRouter.get('/:username/:repositoryname', async (request, response) => {
    const { username, repositoryname } = request.params
    console.log(username, repositoryname)
    return response.status(200).json({message : 'OK'})

})

export default scraperRouter
