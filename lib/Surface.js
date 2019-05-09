import Core from './Core.js';

class Surface extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me.createCanvas();
        me.initCanvas();
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

    createCanvas() {
        let me = this;
        
        let canvas = document.createElement("canvas", { id: `${me.id}-canvas` });
        canvas.setAttribute("width", me.pixelWidth);
        canvas.setAttribute("height", me.pixelHeight);
        document.getElementById(me.id).appendChild(canvas);

        me._ctx = canvas.getContext('2d');
    }

    initCanvas() {
        let me = this;

        // This is not necessary, but kept for debugging purposes
        me._ctx.fillStyle = me.font.colours[0];
        me._ctx.strokeStyle = me.font.colours[1];
        me._ctx.fillRect(0, 0, me.pixelWidth, me.pixelHeight);
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
	    me.font.write(me._ctx, x, y, cell[0], cell.slice(1));
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
