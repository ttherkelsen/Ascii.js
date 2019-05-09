// This is simply a redirection module

export * from './UI/Screen.js';
export * from './UI/LightTheme.js';
export * from './UI/Label.js';
export * from './UI/RowContainer.js';
export * from './UI/ColumnContainer.js';

const components = {
    'screen': Screen,
    'lighttheme': LightTheme,
    'label': Label,
    'rowcontainer': RowContainer,
    'columncontainer': ColumnContainer,
};

export { components };
