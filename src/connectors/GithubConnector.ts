import axios from 'axios'

const GIT_HUB_PATH = 'https://github.com'

class GithubConnector {

    async execute(path :string){
        try {
            const url = GIT_HUB_PATH + path
            return await axios.get(url)
        } catch( error ) {
            console.log(error)
            return error
        }
    }
}

export default new GithubConnector()