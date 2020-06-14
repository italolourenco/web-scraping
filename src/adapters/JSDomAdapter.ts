import { Convert } from "./protocols/Convert"

const jsdom = require('jsdom')
const { JSDOM } = jsdom


class JSDomAdapter implements Convert {
    toVirtualDOM(body){
        const virtualDOM = new JSDOM(body.data);
        return virtualDOM
    }
}

export default new JSDomAdapter()