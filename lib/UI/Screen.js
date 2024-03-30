import Core from '../Core.js';
import Cell from '../Cell.js';

// Important note: Screen is not a component -- you cannot have a screen
// inside a screen; it will always be the top node of your UI hierarchy.
// Screen's purposes is to act as a bridge between Components (that know
// nothing about how things are rendered graphically) and a Surface (which
// only knows how to render things graphically).
// This abstraction exists so that it is possible to replace both
// Component and Surface with other systems without (for example using a
// surface that uses HTML DOM instead of Canvas2D) having to redo the
// entire application.
class Screen extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me.surface.setEventCallback(me.surfaceEvent)
	me.initScreen();
    }

    get DEFAULTS() {
        return {
            // surface : a Surface instance
            // ui : a Component instance
            // theme : a Theme instance
        };
    }

    surfaceEvent(event, data) {
        let me = this;

        me.ui.mouseEvent(event, data);
    }
    
    initScreen() {
        let me = this;
        
	me.cells = Array.from(new Array(me.surface.width * me.surface.height),
                              e => new Cell({ code: me.theme.background, colours: me.theme.colours }));
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

        // FIXME: Handle x/y out of bounds
	// FIXME: Only update/set dirty flag is cells are actually different
        me.cells[y * me.surface.width + x] = cell;
    }
    
    updateCells(update) {
	let me = this;
	let x = update.x;
	let y = update.y;

	if (x < 0 || x >= me.surface.width || y < 0 || y >= me.surface.height) {
	    me.debug("updateCells called with illegal x or y", x, y);
	    return;
	}

        let ox = x;
	for (let cell of update.cells) {
	    me.updateCell(x, y, cell);
            if ((ox - ++x) == update.w) {
                x = ox;
                y++;
            }
	}
    }
    
    render() {
        let me = this;
        let updates;
	
        updates = me.ui.render(me.surface.width, me.surface.height, me.theme);
	updates.forEach(e => me.updateCells(e));
        me.renderCells();
    }
}

export default Screen;
export { Screen };
