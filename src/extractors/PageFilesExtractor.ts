

class PageFilesExtractor {


    static extract(virtualDOM){

        const containerPageFiles = virtualDOM.window.document.querySelector('#js-repo-pjax-container > div.container-lg.clearfix.new-discussion-timeline.px-3 > div > div.Box.mb-3.Box--condensed')
        const tableFiles = containerPageFiles.querySelector('table')
        const tableBody = tableFiles.querySelectorAll(('tbody'))

        const tableInfo = tableBody.length > 1 ? tableBody[1] :tableBody[0]

        tableInfo.removeChild(tableInfo.children[0])
        
        const rows = tableInfo.children

        return rows
    }
}

export default PageFilesExtractor