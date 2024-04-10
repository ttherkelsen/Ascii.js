import TrackedComponent from './TrackedComponent.js';
import Cell from '../Cell.js';
import CellUpdate from '../CellUpdate.js';

class Button extends TrackedComponent {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me._buttonHover = false;
        me._buttonPressed = false;
    }

    get DEFAULTS() {
        return {
            // text : string
        };
    }

    mouseEvent(event, data) {
        let me = this;

        if (event == 'cellEnter') {
            if (!me._buttonHover) {
                me._buttonHover = true;
                return true;
            }
            return false;
        }

        // event == 'cellLeave'
        if (me._buttonHover) {
            me._buttonHover = false;
            return true;
        }
    }

    layout(width, height) {
	let me = this;
	
        return [ me.text.length, 1 ];
    }
    
    render(width, height, theme) {
        let me = this;

        let colours = me._buttonHover ? theme.buttonHoverColours : theme.buttonColours;
        
        return [
            new CellUpdate({
                w: width, h: height,
                cells: Array.from(me.text, c => new Cell({code: c, colours})),
            })
        ]
    }
}

export default Button;
export { Button };
