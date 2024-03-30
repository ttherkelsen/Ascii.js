import Core from './Core.js';

class Cell extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        if (typeof(me.code) === "string") {
            me.code = me.code.codePointAt(0);
        }
    }

    get DEFAULTS() {
        return {
            // code : an integer CodePoint
            // colours: [optional] a (sparse) array of colours
        };
    }
}

export default Cell;
export { Cell };
