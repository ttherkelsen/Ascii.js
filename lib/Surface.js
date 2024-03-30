import Core from './Core.js';

class Surface extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me.createCanvas();
    }

    get DEFAULTS() {
        return {
        };
    }

    get pixelWidth() {
        let me = this;
        
        return me.font.width * me.width;
    }

    get pixelHeight() {
        let me = this;
        
        return me.font.height * me.height;
    }

    pixel2cell(x, y) {
        let me = this;

        return [
            Math.trunc(x / me.font.width),
            Math.trunc(y / me.font.height),
        ];
    }

    setEventCallback(callback) {
        let me = this;
        
        me._eventCallback = callback;
    }
    
    eventMouseMove(event) {
        let me = this;
        let rect = event.target.getBoundingClientRect();
        let x = event.x - rect.left;
        let y = event.y - rect.top;

        [ x, y ] = me.pixel2cell(x, y);
        if (me._lastcell) {
            if (me._lastcell.x == x && me._lastcell.y == y) {
                return;
            }
        }
        me._lastcell = { x, y };
        me._eventCallback("cellEnter", me._lastcell)
    }

    eventMouseLeave(event) {
        let me = this;
        
        if (me._lastcell) {
            me._eventCallback("cellLeave", me._lastcell)
            me._lastcell = null;
        }
    }
    
    createCanvas() {
        let me = this;
        
        let canvas = document.createElement("canvas", { id: `${me.id}-canvas` });
        canvas.setAttribute("width", me.pixelWidth);
        canvas.setAttribute("height", me.pixelHeight);
        document.getElementById(me.id).appendChild(canvas);

        me._ctx = canvas.getContext('2d');

        me._lastcell = null;
        
        canvas.addEventListener("mousemove", event => me.eventMouseMove(event));
        canvas.addEventListener("mouseleave", event => me.eventMouseLeave(event));
    }

    write(x, y, text, colour) {
        let me = this;
        
        for (let ch of text) {
            me.font.write(me._ctx, x, y, ch.codePointAt(0), colour);
            if (++x >= me.width) {
                x = 0;
                if (++y >= me.height) {
                    y = 0;
                }
            }
        }
    }

    writeCells(x, y, cells) {
	let me = this;
        
        for (let cell of cells) {
	    me.font.write(me._ctx, x, y, cell.code, cell.colours);
            if (++x >= me.width) {
                x = 0;
                if (++y >= me.height) {
                    y = 0;
                }
            }
        }
    }
}

export default Surface;
export { Surface };
