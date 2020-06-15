import { Convert } from "./protocols/Convert" 

import { JSDOM } from 'jsdom';


class JSDomAdapter implements Convert {
    toVirtualDOM(body){
        const virtualDOM = new JSDOM(body.data);
        return virtualDOM
    }
}

export default new JSDomAdapter()