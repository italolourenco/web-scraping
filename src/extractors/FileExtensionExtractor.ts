

class FileExtensionExtractor {


    static extract(virtualDOM){
        const fullName = virtualDOM.window.document.querySelector('strong.final-path')
        const splitName = fullName.textContent.split('.')
        const extension = splitName.pop()

        return extension
    }
}

export default FileExtensionExtractor