import GithubConnector from "../connectors/GithubConnector";
import FileExtensionExtractor from "../extractors/FileExtensionExtractor";
import FileInfoExtractor from "../extractors/FileInfoExtractor";
import { Convert } from "../adapters/protocols/Convert";
import { ExtensionResume } from "../models/ExtensionResume";

const jsdom = require('jsdom')
const { JSDOM } = jsdom


class FileTranslator {

  constructor(private readonly converter: Convert) {}


    async execute(path: string): Promise<ExtensionResume> {

        console.log("get file data from : " , path)

        const body = await GithubConnector.execute(path)

        const virtualDOM = new JSDOM(body.data);

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