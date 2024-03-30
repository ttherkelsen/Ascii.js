import Component from './Component.js';

class RowContainer extends Component {
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
	    lh += h;
	    if (w > lw) {
		lw = w;
	    }
	}
	me._layout = _layout;
	return [ lw, lh ];
    }
    
    render(width, height, theme) {
        let me = this;
        let updates = [];

	// If we don't have a valid layout (either because it is the first
	// time we are being rendered, or because a re-layout has been
	// scheduled) make one, first.
	if (!me._layout) {
	    me.layout(width, height);
	}

        // 3. Render each child, telling it how much space it can use
        // FIXME: If it uses more than allocated, truncate returned array
        let h = 0;
	for (let [ idx, child ] of me.children.entries()) {
	    let cupdates = child.render(...me._layout[idx], theme);
            cupdates.forEach(e => e.y += h);
            h += me._layout[idx][1];

	    // Should probably use a for loop for scalability, but this only becomes a problem if ccells.length > 100k
	    updates.push(...cupdates);
	}

        // 4. Return array with new cells
	return updates;
    }
}

export default RowContainer;
export { RowContainer };
