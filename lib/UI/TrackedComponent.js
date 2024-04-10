import Component from './Component.js';

class TrackedComponent extends Component {
    constructor(opts = {}) {
        super(opts);
        let me = this;
    }

    get DEFAULTS() {
        return {
        };
    }

    get mouseTracking() { return true; }
}

export default TrackedComponent;
export { TrackedComponent };
