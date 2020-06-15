import { Router } from 'express'
import ScraperService from '../services/ScraperService'

const scraperRouter = Router()

/** 
 *  @swagger
 *  path:
 *   /scraping/{userName}/{repositoryName}:
 *    get:
 *      summary: Get information about the number of lines and bytes of all file extensions in a repository
 *      tags: [RepositoryResume]
 *      parameters:
 *      - name: userName
 *        in: "path"
 *        required: true
 *        type: "string"
 *      - name: repositoryName
 *        in: "path"
 *        required: true
 *        type: "string"
 *      responses:
 *        200:
 *          description: Get information by repository
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RepositoryResume'
 * 
 */
scraperRouter.get('/:username/:repositoryname', async (request, response) => {
    const { username, repositoryname } = request.params

    const repositoryInfo = await ScraperService.execute(username, repositoryname)

    return response.status(200).json({result : repositoryInfo})

})

export default scraperRouter
