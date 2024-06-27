import Core from '../Core.js';

class Line extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

    }

    get DEFAULTS() {
        return {
            // x : integer >= 0, start x position of line
            // y : integer >= 0, start y position of line
            // length : [optional*] integer >= 1, length of line, *must specify this or width+height
            // width : integer >= 1, width of line/box, 
            // type : string ('hl', 'vl', 'box'), type of line
        };
    }

    static draw(lines) {
    }
}

export default Line;
export { Line };
