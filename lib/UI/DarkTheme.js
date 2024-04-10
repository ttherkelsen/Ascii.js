import Theme from './Theme.js';

class DarkTheme extends Theme {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
	    colours: [ "#000000ff", "#f0f0f0ff" ],
            buttonColours: [ "#30c030ff", "#000000ff" ],
            buttonHoverColours: [ "#30c0c0ff", "#000000ff" ],
	    border: 1,
	    shadowOffset: [ 2, 1 ],
	    background: 0x20,
        };
    }
}

export default DarkTheme;
export { DarkTheme };
