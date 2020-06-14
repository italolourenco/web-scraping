import GithubConnector from "../connectors/GithubConnector";

const jsdom = require('jsdom')
const { JSDOM } = jsdom

const GIT_HUB_PATH = 'https://github.com'


const DEFAULT_REQUEST_OPTIONS = {
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    simple: false,
    time: true,
};

class FileTranslator {

    async execute(path: string) {

        console.log("get file data from : " , path)

        const body = await GithubConnector.execute(path)

        const jsdomOpts = Object.assign({}, DEFAULT_REQUEST_OPTIONS, { url: GIT_HUB_PATH + path });
        const virtualDOM = new JSDOM(body.data, jsdomOpts);
      
        const divRepository = virtualDOM.window.document.querySelector('div.text-mono')
        const fileName = virtualDOM.window.document.querySelector('strong.final-path')
    
        const names = fileName.textContent.split('.')
        const extension = names[1]
        const textDiv = divRepository.textContent
        const text = JSON.stringify(textDiv).replace(/[^\d.-]/g, ' ')
        const dataList = text.split(' ')
        const a = [ ]
        dataList.forEach(data => {
          if(data!=='') {
            a.push(data)
          }
        })
        return { extension: extension, lines : parseInt(a[0]), bytes: parseFloat(a[2])}

    }

}

export default new FileTranslator()