
export interface FileLink {
    path: string
    type: linkType
}

export enum linkType {
    FOLDER = 'FOLDER',
    FILE = 'FILE'
}


class FileLinkExtractor {


    static extract(component){

        const cellSelector = component.querySelector('tr > td > span > a')

        const link = cellSelector.getAttribute('href')
        const name = cellSelector.getAttribute('title')

        const separetor = name.split('.')

        const typeLink = separetor.length == 1 && (separetor[0] !== 'Dockerfile' && separetor[0] !== 'license' ) ? linkType.FOLDER : linkType.FILE


        const fileLink : FileLink = {
            path: link,
            type: typeLink
        }

        return fileLink
    }
}

export default FileLinkExtractor