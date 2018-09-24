import Surface from './Surface.js';

class DynamicSurface extends Surface {
    async write(x, y, text, colour) {
        let me = this;
        
        for (let ch of text) {
            await me.font.write(me._ctx, x, y, ch.codePointAt(0), colour);
            if (++x >= me.width) {
                x = 0;
                if (++y >= me.height) {
                    y = 0;
                }
            }
        }
    }
}

export default DynamicSurface;
export { DynamicSurface };
