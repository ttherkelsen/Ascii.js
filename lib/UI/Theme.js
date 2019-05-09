import Core from '../Core.js';

class Theme extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
        };
    }
}

export default Theme;
export { Theme };
