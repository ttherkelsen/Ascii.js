import TrackedComponent from './TrackedComponent.js';

class Container extends TrackedComponent {
    constructor(opts = {}) {
        super(opts);
        let me = this;

        me._lastchild = null;
        me._mouseTracking = null;
    }

    get DEFAULTS() {
        return {
        };
    }

    // Minor optimisation for the case of no children wanting mouse tracking
    get mouseTracking() {
        let me = this;

        if (me._mouseTracking !== null) {
            return me._mouseTracking;
        }

        for (let child of me.children) {
            if (child.mouseTracking) {
                return me._mouseTracking = true;
            }
        }

        return me._mouseTracking = false;
    }
    
    mouseEvent(event, data) {
        let me = this;
        let changes = false;
        
        if (me.traceMouseEvents) {
            me.debug(event, data);
        }
        
        if (event == "cellLeave") {
            if (me._lastchild) {
                changes = me._lastchild.mouseEvent(event);
                me._lastchild = null;
            }
            return changes;
        }

        // event == "cellEnter"
        for (let child of me.children) {
            if (!child.mouseTracking) {
                continue;
            }
            let bbox = child.getBBox();
            if (data.x >= bbox.x && data.x <= bbox.x2 && data.y >= bbox.y && data.y <= bbox.y2) {
                if (me._lastchild && child != me._lastchild) {
                    changes = me._lastchild.mouseEvent("cellLeave");
                }
                changes = child.mouseEvent(event, { x: data.x - bbox.x, y: data.y - bbox.y }) || changes;
                me._lastchild = child;
                return changes;
            }
        }
        
        if (me._lastchild) {
            changes = me._lastchild.mouseEvent("cellLeave");
            me._lastchild = null;
        }
        return changes;
    }
}

export default Container;
export { Container };
