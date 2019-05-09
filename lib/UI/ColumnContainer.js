import Component from './Component.js';
import max_length from '../utils.js';

class ColumnContainer extends Component {
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
        let _layout = [];
	let lw, lh;

	
        // 1. Ask each child how much space it wants
	
        for (let child of me.children) {
            _layout.push(child.layout(width, height));
        }

        // 2. Divide space amongst the children
        // FIXME: More layout strategies are probably needed, for now just
	// go with a minimalistic approach and give each child with it
	// asks for.  Ie., do nothing.  We still need to calculate dimensions
	// and return them, though.
	
	lw = lh = 0;
	for (let [ w, h ] of _layout) {
	    lw += w;
	    if (h > lh) {
		lh = h;
	    }
	}
	for (let 
	me._layout = _layout;
	return [ lw, lh ];
    }
    
    render(width, height, theme) {
        let me = this;
        let data = [];
	let cells;

	// If we don't have a valid layout (either because it is the first
	// time we are being rendered, or because a re-layout has been
	// scheduled) make one, first.
	if (!me._layout) {
	    me.layout(width, height);
	}

        // Render each child, telling it how much space it can use
        // FIXME: If it uses more than allocated, truncate returned array
	for (let [ idx, child ] of me.children.entries()) {
	    data.push(child.render(...me._layout[idx]));
	}

	// Align cells
	let maxh = max_length(data);
	cells = Array.from(new Array(maxh), e => []);
	
	for (let [ idx, child ] of data) {
	    let maxw = max_length(c);
	    for (let row of c) {
		
	    }
	}

	
        // Return array with new cells
	return me._cells = cells;
    }
}

export default ColumnContainer;
export { ColumnContainer };
