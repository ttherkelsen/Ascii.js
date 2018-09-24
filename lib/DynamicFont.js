import Font from './Font.js';

class DynamicFont extends Font {
    static async createFont(name) {
        let font = new this({ name });
        await font.loadMetaData();
        return font;
    }
    
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me.glyphs = {};
        me.loadedPages = new Set();
    }

    get DEFAULTS() { // FIXME: Remove this function if this class ends up not needing its own defaults
        return Object.assign(super.DEFAULTS, {
        });
    }

    async loadMetaData() {
        let me = this;
        let meta = await import(`./font/${me.name}/meta.js`);

        // Sadly no functionality to loop over a module's exports
        // programmatically (yet?).  So we have to do it semi-manually
        // for now (properties is an exported value from the font
        // meta.js module).
        me._meta = meta; // FIXME: Do we need to keep this around?
        for (let prop of meta.properties) {
            me[prop] = meta[prop];
        }
    }

    async loadPage(page) {
        let me = this;

        if (me.loadedPages.has(page)) {
            return;
        }
        me.loadedPages.add(page);

        if (!(me.pages.has(page))) {
            me.debug(`Warning, attempting to load a glyph page (${page}) which doesn't exist for this font!`);
            return;
        }
        
        let module = await import(`./font/${me.name}/${page}.js`);
        me.glyphs = Object.assign(me.glyphs, module.glyphs); 
    }

    async write(ctx, x, y, glyph, colours) {
        let me = this;
        
        colours = colours || me.colours;
        let index = glyph % 256;
	await me.loadPage(glyph >> 8);
        let page = me.getGlyphPage(glyph >> 8, colours);

        ctx.drawImage(
            page, // source ctx
            index*me.width, 0, me.width, me.height, // src: x, y, width, height
            x*me.width, y*me.height, me.width, me.height  // dst: x, y, width, height
        );
    }

}

export default DynamicFont;
export { DynamicFont };
