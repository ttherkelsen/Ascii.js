import Component from './Component.js';
import Cell from '../Cell.js';
import CellUpdate from '../CellUpdate.js';

class Label extends Component {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
            // text : string
        };
    }

    layout(width, height) {
	let me = this;
	
        return [ me.text.length, 1 ];
    }
    
    render(width, height, theme) {
        let me = this;

        return [
            new CellUpdate({
                w: width, h: height,
                cells: Array.from(me.text, c => new Cell({code: c, colours: theme.colours})),
            })
        ]
    }
}

function l(text) { return new Label({ text }); }

export default Label;
export { Label, l };
