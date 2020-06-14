import GithubConnector from "../connectors/GithubConnector";
import FileTranslator from "./FileTranslator";

const jsdom = require('jsdom')
const { JSDOM } = jsdom

const GIT_HUB_PATH = 'https://github.com'


const DEFAULT_REQUEST_OPTIONS = {
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    simple: false,
    time: true,
};

class PageTranslator {

    async execute(path, secondPath = false, dataList = []){

        console.log("get data from : " , path)

        let repositoryResume = dataList.length ? dataList : []

        const body = await GithubConnector.execute(path)

        const jsdomOpts = Object.assign({}, DEFAULT_REQUEST_OPTIONS, { url: GIT_HUB_PATH + path });
        const virtualDOM = new JSDOM(body.data, jsdomOpts);
        
        const divRepos = virtualDOM.window.document.querySelector('#js-repo-pjax-container > div.container-lg.clearfix.new-discussion-timeline.px-3 > div > div.Box.mb-3.Box--condensed')
        const table = divRepos.querySelector('table')
        let tbody = null
        if(secondPath) {
            tbody = table.querySelectorAll('tbody')[1]
    
        }
        else{
            tbody = table.querySelector('tbody')
        }
        const rows = tbody.children
    
        const keys = Object.keys(rows)
        
        for(const key of keys) {
          if(key !== '0') {
            const rowSelector = rows[key]
            const cellSelector = rowSelector.querySelector('tr > td > span > a')
            const fileLink = cellSelector.getAttribute('href')
            const name = cellSelector.getAttribute('title')
    
            const separetor = name.split('.')
            if(separetor.length == 1 && separetor[0] !== 'Dockerfile'){
                repositoryResume = await this.execute(fileLink, true, repositoryResume)
            }
    
            else {
                const result = await FileTranslator.execute(fileLink)
                let findElement = false
        
                repositoryResume.map(data => {
                  if(data.extension === result.extension){
                    data.lines = data.lines + result.lines
                    data.bytes = data.bytes + result.bytes
                    findElement = true
                    return data
                  }
                })
        
                if(!findElement){
                    repositoryResume.push(result)
                }
            }
    
        }
      }

      return repositoryResume
    }
    
}

export default new PageTranslator()