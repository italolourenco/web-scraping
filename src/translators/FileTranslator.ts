import GithubConnector from "../connectors/GithubConnector";
import FileExtensionExtractor from "../extractors/FileExtensionExtractor";
import FileInfoExtractor from "../extractors/FileInfoExtractor";
import { Convert } from "../adapters/protocols/Convert";

const jsdom = require('jsdom')
const { JSDOM } = jsdom

export interface FileResume {
  extension: string,
  lines: number,
  bytes: number
}

class FileTranslator {

  constructor(private readonly converter: Convert) {}


    async execute(path: string): Promise<FileResume> {

        console.log("get file data from : " , path)

        const body = await GithubConnector.execute(path)

        const virtualDOM = new JSDOM(body.data);

        const extension = FileExtensionExtractor.extract(virtualDOM)

        const fileInfo = FileInfoExtractor.extract(virtualDOM)

        const fileResume: FileResume = {
          extension: extension,
          lines : fileInfo.lines,
          bytes: fileInfo.bytes
        }

        return fileResume

    }

}

export default FileTranslator