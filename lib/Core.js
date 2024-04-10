import * as utils from "./utils.js";

/*
 * Core is the ancestor of all objects.  It defines various core
 * methods that all objects need.
 */
class Core {
    constructor(opts) {
	let me = this;

	opts = { ...me.DEFAULTS, ...opts };
	for (let p in opts) {
	    if (p.substr(0, 1) === '_' || !opts.hasOwnProperty(p)) continue;
	    if (typeof me[p] === 'function' || typeof opts[p] === 'function') continue;
	
	    me[p] = opts[p];
	}
        /* FIXME: Maybe this should be removed altogether?  I think the above code works
         * to merge data properly, so probably no need for _options?
	me._options = opts;
        */
    }

    debug() {
	utils.debug.apply(null, arguments);
    }
}

export default Core;
export { Core };
