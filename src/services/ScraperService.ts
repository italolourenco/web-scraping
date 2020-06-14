import GithubConnector from "../connectors/GithubConnector"
import PageTranslator from "../translator/PageTranslator"


class ScraperService {

    async execute(userName: string, repositoryName: string){
        const path = `/${userName}/${repositoryName}`

        const result = await PageTranslator.execute(path)

        console.log(result)

    }
}

export default new ScraperService()