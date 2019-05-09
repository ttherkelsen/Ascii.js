import Component from './Component.js';

class Screen extends Component {
    constructor(opts = {}) {
        super(opts);
        let me = this;

	me.initScreen();
    }

    get DEFAULTS() {
        return {
        };
    }

    initScreen() {
        let me = this;
        
	me.cells = Array.from(new Array(me.surface.width * me.surface.height),
                              e => [ me.theme.background, ...me.theme.colours ]);
	me.renderCells();
        me.cursor = { x: 0, y: 0 };
        me.colours = Array.from(me.theme.colours);
    }

    renderCells() {
	// FIXME: Only write cells changed since last call to renderCells
	let me = this;
	me.surface.writeCells(0, 0, me.cells);
    }

    popupWindow(title, contents) {
        let me = this;
        
        me.debug("popupWindow - not implemented yet");
    }

    advanceCursor() {
        let me = this;

        if (++me.cursor.x >= me.surface.width) {
            me.cursor.x = 0;
            if (++me.cursor.y >= me.surface.height) {
                me.cursor.y = 0;
            }
        }
    }

    updateCell(x, y, cell) {
        let me = this;
	
        switch (typeof(cell)) {
	case "string":
            cell = [ cell.codePointAt(0), ...me.colours ];
	    break;
	case "number":
	    cell = [ cell, ...me.colours ];
	    break;
	}
	
	// FIXME: Only update/set dirty flag is cells are actually different
        me.cells[y * me.surface.width + x] = cell;
    }
    
    updateCells(x, y, cells) {
	let me = this;
	let ox = x;

	if (x < 0 || x >= me.surface.width || y < 0 || y >= me.surface.height) {
	    me.debug("updateCells called with illegal x or y", x, y);
	    return;
	}
	
	for (let row of cells) {
	    x = ox;
	    for (let cell of row) {
		me.updateCell(x, y, cell);
		if (++x >= me.surface.width) {
		    break;
		}
	    }
	    if (++y >= me.surface.height) {
		break;
	    }
	}
    }
    
    render() {
        let me = this;
        let cells;
	
        updates = me.root.render(me.surface.width, me.surface.height, me.theme);
	me.updateCells(0, 0, cells);
        me.renderCells();
    }
}

export default Screen;
export { Screen };
