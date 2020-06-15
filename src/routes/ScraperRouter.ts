import { Router, Request, Response } from "express"
import ScraperService from '../services/ScraperService'
import pino from 'pino'
const logger = pino()


class ScraperRouter {
    public router: Router

    constructor() {
        this.router = Router()
        this.setSubRoutes()
    }

    private setSubRoutes(): void {
        this.router.get('/:username/:repositoryname', this.scraper)
    }

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
    public async scraper(request: Request, response: Response): Promise<Response> {
        const { username, repositoryname } = request.params

        try {
            const repositoryInfo = await ScraperService.execute(username, repositoryname)
            logger.info(`Success on request for repository ${username}/${repositoryname}`, {
                eventName: "ScraperServiceExecute",
                repositoryInfo
            })
            return response.status(200).json({result : repositoryInfo})

        } catch (error) {
            return response.send({
                message: `Error on request for repository ${username}/${repositoryname}`,
                error: {
                    message: error.message,
                    stack: error.stack
                }
            })
        }
    }
}

export default ScraperRouter