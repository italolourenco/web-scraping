
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

        const FileInfos = [ ]

        textWithoutCharacters.forEach(info => {
          const infoIsValid = info !== '' || false

          if(infoIsValid) {
            FileInfos.push(info)
          }

        })

        const fileResume: InfoResume ={
            lines: parseInt(FileInfos[0]),
            bytes: parseFloat(FileInfos[2])

        }

        return fileResume
    }
}

export default FileInfoExtractor