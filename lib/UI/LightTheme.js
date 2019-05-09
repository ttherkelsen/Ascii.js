import Theme from './Theme.js';

class LightTheme extends Theme {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
	    colours: [ "#c0c0c0ff", "#333333ff" ],
	    border: 1,
	    shadowOffset: [ 2, 1 ],
	    background: 0x20,
        };
    }
}

export default LightTheme;
export { LightTheme };
