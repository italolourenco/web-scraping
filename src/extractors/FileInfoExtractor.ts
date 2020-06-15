
export interface InfoResume {
    lines: number,
    bytes: number
}

class FileInfoExtractor {

    static extract(virtualDOM){

        const fileInfoContainer = virtualDOM.window.document.querySelector('div.text-mono')
        const fileInfoText = fileInfoContainer.textContent

        const formatedInfoText = this.formatText(fileInfoText)

        return formatedInfoText
    }

    private static formatText(fileInfoText){
        const textWithoutCharacters = JSON.stringify(fileInfoText).replace(/[^\d.-]/g, ' ').split(' ')

        const fileInfos = [ ]

        textWithoutCharacters.forEach(info => {
          const infoIsValid = info !== '' || false

          if(infoIsValid) {
            fileInfos.push(info)
          }

        })

        const numberOfLines = fileInfos.length > 1 ? parseInt(fileInfos[0]) : 0
        const numberOfBytes = fileInfos.length > 1 ? parseFloat(fileInfos[2]) : parseFloat(fileInfos[0])

        const fileResume: InfoResume ={
            lines: numberOfLines,
            bytes: numberOfBytes

        }

        return fileResume
    }
}

export default FileInfoExtractor