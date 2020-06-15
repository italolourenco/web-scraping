import GithubConnector from "../connectors/GithubConnector";
import FileExtensionExtractor from "../extractors/FileExtensionExtractor";
import FileInfoExtractor from "../extractors/FileInfoExtractor";
import { Convert } from "../adapters/protocols/Convert";
import { ExtensionResume } from "../models/ExtensionResume";

class FileTranslator {

  constructor(private readonly converter: Convert) {}


    async execute(path: string): Promise<ExtensionResume> {

        console.log("get file data from : " , path)

        const body = await GithubConnector.execute(path)

        const virtualDOM = this.converter.toVirtualDOM(body)

        const extension = FileExtensionExtractor.extract(virtualDOM)

        const fileInfo = FileInfoExtractor.extract(virtualDOM)

        const extensionResume: ExtensionResume = {
          extension: extension,
          lines : fileInfo.lines,
          bytes: fileInfo.bytes
        }

        return extensionResume

    }

}

export default FileTranslator