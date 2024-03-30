import Core from '../Core.js';

class Component extends Core {
    constructor(opts = {}) {
        super(opts);
        let me = this;

	me._dirty = null;
	me._size = null;
    }

    get DEFAULTS() {
        return {
        };
    }

    setDirty(...coordinates) {
	let me = this;
	
	if (!coordinates) {
	    me._dirty = null;
	    return;
	}

	if (!me._dirty) {
	    me._dirty = Array(me._size.h * me._size.w).fill(false);
	}

	for (let [ x, y ] of coordinates) {
	    me._dirty[ y*me._size.w + x ] = true;
	}
    }
    
    setSize(w, h) {
	let me = this;

	me._size = { w, h };
	me.setDirty();
    }

    mouseEvent(event, data) {
    }
    
    /*
      Layout philosophy.

      As a base rule, every component is responsible for rendering
      itself within the space allocated to it by its parent component.

      How the component renders itself within the space (left/top
      alignment, stretched, center/middle alignment, adding scrollbars
      if necessary, etc) is entirely up to the layout configuration of
      the component, although some layout settings may be inherited
      from the chosen theme.  Static methods exists in the Component
      class to assist with common layout tasks during rendering.

      For example, if you have this component hierarchy:

         ColumnContainer([
	   Label("Text 1"),
	   Label("Text 2\nNewline 2"),
	   Label("Text 3"),
	 ])

      Then the ColumnContainer will have a layout width of 21 and a
      height of 2.  Each child component will have a height of 2
      because of the layout mechanism of the ColumnContainer
      (arranging its child components in columns)
    */ 
    layout(width, height, theme) {
	throw new Error("Component.layout() must be implemented in subclass!");
    }

    /*
      Rendering mechanism

      This method must return an array (length >= 1) of CellUpdate objects:

        {
	  x: <integer >= 0, optional, assumed to be 0 if not specified>
	  y: <integer >= 0, optional, assumed to be 0 if not specified>
	  w: <integer >= 1>,
	  h: <integer >= 1>,
	  cells: Array(<width> * <height>) of Cells,
	}

      The x and y offset values are relative to the width and height passed to the
      render() method.  For example, if render(5, 3, theme) is called, and a
      CellUpdate object { x: 2, y: 1, w: 2, h: 1, [ "y", "y" ] }
      is returned it refers to this rendered text:

          xxxxx
	  xxyyx
	  xxxxx

      In this case, "x" cells are not updated, only "y" cells.
    */
    render(width, height, theme) {
	throw new Error("Component.render() must be implemented in subclass!");
    }
}

export default Component;
export { Component };
