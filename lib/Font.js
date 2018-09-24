import Core from './Core.js';
import * as utils from './utils.js';

class Font extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me._cache = {};
    }

    get DEFAULTS() {
        return {
            unknownGlyph: 0,
        };
    }

    write(ctx, x, y, glyph, colours) {
        let me = this;
        
        colours = colours || me.colours;
        let index = glyph % 256;
        let page = me.getGlyphPage(glyph >> 8, colours);

        ctx.drawImage(
            page, // source ctx
            index*me.width, 0, me.width, me.height, // src: x, y, width, height
            x*me.width, y*me.height, me.width, me.height  // dst: x, y, width, height
        );
    }

    getGlyphPage(page, colours) {
        let me = this;
        
        let cachestr = me.name + JSON.stringify(colours)
        let tmp, tmp2;

        // Is it already cached?
        if ((tmp = me._cache[cachestr]) && (tmp2 = tmp[page])) {
            return tmp2;
        }

        if (!tmp) {
            tmp = me._cache[cachestr] = {};
        }

        return tmp[page] = me.renderGlyphPage(page, colours);
    }

    renderGlyphPage(page, colours) {
        let me = this;
        
        let canvas = document.createElement('canvas');
        canvas.setAttribute("height", me.height);
        canvas.setAttribute("width", me.width * 256);
        let ctx = canvas.getContext('2d');
        let img = ctx.createImageData(me.width * 256, me.height);
        let bitmask = (me.depth << 1) - 1;

        colours = colours.map(utils.colour_hex2array);
        
        for (let i = 0; i < 256; i++) {
            let bitmap = me.glyphs[page * 256 + i] || me.glyphs[me.unknownGlyph];
            for (let y = 0; y < me.height; y++) {
                let row = bitmap[y];
                for (let x = 0; x < me.width; x++) {
                    let colour = colours[row & bitmask];

                    let j = 4;
                    while (j--) img.data[i*me.width*4 + y*me.width*4*256 + (me.width - x - 1)*4 + j] = colour[j];
                    row >>= me.depth;
                }
            }
        }

        ctx.putImageData(img, 0, 0);
        return canvas;
    }
}

export default Font;
export { Font };
