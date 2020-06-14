import PageTranslator from "../translators/PageTranslator"
import JSDomAdapter from "../adapters/JSDomAdapter"
import { CacheManagerFactory } from "../cache-manager/CacheManagerFactory"


class ScraperService {

    async execute(userName: string, repositoryName: string){

        try {
            const path = `/${userName}/${repositoryName}`

            const cacheFactory = CacheManagerFactory.getInstance('127.0.0.1', 6379)
            const cache = cacheFactory.createCacheManager()

            const requestIsCached = await cache.get(path)

            if(!requestIsCached){
                const pageTranslator = new PageTranslator(JSDomAdapter)
                const result = await pageTranslator.execute(path)
                await cache.set(path, JSON.stringify(result))
                return result 
            }

            return JSON.parse(requestIsCached)
        }
        catch(error){
            console.log(error)
        }
    }
}

export default new ScraperService()