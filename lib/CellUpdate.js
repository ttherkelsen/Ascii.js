import Core from './Core.js';

class CellUpdate extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
            x: 0,
            y: 0,
            // w : integer >= 1, width of update
            // h : integer >= 1, height of update
            // cells: a (sparse) array (max size w*h) of Cells
        };
    }
}

export default CellUpdate;
export { CellUpdate };
