let _DEBUG = true;

function toggleDebug(state = null) {
    if (state === null) {
        _DEBUG = !_DEBUG;
    }
    else {
        _DEBUG = !!state;
    }
}

function ready(callback) {
    document.addEventListener('DOMContentLoaded', callback);
}

function debug() {
    if (_DEBUG) {
	console.log.apply(null, arguments);
    }
}

// Convert from #rrggbbaa to array of ints: [ rr, gg, bb, aa ]
function colour_hex2array(hexcolour) {
    return [
        parseInt(hexcolour.slice(1, 3), 16), // r
        parseInt(hexcolour.slice(3, 5), 16), // g
        parseInt(hexcolour.slice(5, 7), 16), // b
        parseInt(hexcolour.slice(7), 16), // a
    ];
}

function max_length(arr) {
    return arr.reduce((a, b) => b.length > a ? b.length : a, 0);
}

export { ready, debug, toggleDebug, colour_hex2array, max_length };
