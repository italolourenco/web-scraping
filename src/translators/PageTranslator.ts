import GithubConnector from "../connectors/GithubConnector";
import FileTranslator from "./FileTranslator";
import FileLinkExtractor, { linkType } from "../extractors/FileLinkExtractor";
import PageFilesExtractor from "../extractors/PageFilesExtractor";
import { Convert } from "../adapters/protocols/Convert";
import { ExtensionResume } from "../models/ExtensionResume";

class PageTranslator {

  constructor(private readonly converter: Convert) {}

    async execute(path, repositoryResumeData = []){

        console.log("get data from : " , path)

        let repositoryResume = repositoryResumeData.length ? repositoryResumeData : []

        const body = await GithubConnector.execute(path)

        const virtualDOM = this.converter.toVirtualDOM(body)

        const rowsData = PageFilesExtractor.extract(virtualDOM)
        
        for(const row of rowsData) {
            const fileLink = FileLinkExtractor.extract(row)

            if(fileLink.type === linkType.FOLDER){
              repositoryResume = await this.execute(fileLink.path, repositoryResume)
            }

            else {
                const result = await new FileTranslator(this.converter).execute(fileLink.path)
                repositoryResume = this.updateRepositoryResume(repositoryResume, result)
            }
    
      }

      return repositoryResume
    }

    private updateRepositoryResume(repositoryResume: ExtensionResume[], extensionResume: ExtensionResume) {
      let findExtension = false
        
      repositoryResume.map(repositorySave => {
        if(repositorySave.extension === extensionResume.extension){
          repositorySave.lines += extensionResume.lines
          repositorySave.bytes += extensionResume.bytes
          findExtension = true
          return repositorySave
        }
      })

      if(!findExtension){
          repositoryResume.push(extensionResume)
      }

      return repositoryResume
    }
    
}

export default PageTranslator