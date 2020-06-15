
export interface FileLink {
    path: string
    type: linkType
}

export enum linkType {
    FOLDER = 'directory',
    FILE = 'file'
}


class FileLinkExtractor {


    static extract(component){

        const pathFile = this.pathExtractor(component)

        const typeFile = this.typeExtractor(component)

        const fileLink : FileLink = {
            path: pathFile,
            type: typeFile
        }

        return fileLink
    }

    private static pathExtractor(component) {
        const cellSelector = component.querySelector('tr > td > span > a')
        const path = cellSelector.getAttribute('href')

        return path
    }

    private static typeExtractor(component) {
        const cellSelector = component.querySelector('tr > td.icon > svg')
        const type = cellSelector.getAttribute('aria-label')

        return type

    }
}

export default FileLinkExtractor