import Container from './Container.js';

class RowContainer extends Container {
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
        // We also need to build a bounding box for redirecting mouse events
	
	lw = lh = 0;
	for (let [ idx, [ w, h ] ] of _layout.entries()) {
            me.children[idx].setSize(w, h);
            me.children[idx].setBBox(0, lh, w-1, lh+h-1);
	    lh += h;
	    if (w > lw) {
		lw = w;
	    }
	}
        me.setSize(lw, lh);
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
	for (let child of me.children) {
            let csize = child.getSize();
	    let cupdates = child.render(csize.w, csize.h, theme);
            cupdates.forEach(e => e.y += h);
            h += csize.h;

	    // FIXME: Should probably use a for loop for scalability but ... is fine for now
	    updates.push(...cupdates);
	}

        // 4. Return array with new cells
	return updates;
    }
}

export default RowContainer;
export { RowContainer };
