import Component from './Component.js';

class Label extends Component {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
        };
    }

    layout(width, height) {
	let me = this;
	
        return [ me.text.length, 1 ];
    }
    
    render(width, height, theme) {
        let me = this;

        return [ Array.from(me.text) ]
    }
}

export default Label;
export { Label };
