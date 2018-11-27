import React from 'react'
import ReactDom from 'react-dom'
import IsdcAvalanches from './main.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Avalanches {
    constructor(domId, options) {
        this._domId = domId;
        this._urlAvalanches = options.urlAvalanches
    }

    set urlAvalanches(value) {
        this._urlAvalanches = value;
    }
    view() {
        ReactDom.render(
            <MuiThemeProvider>
                <IsdcAvalanches
                    urlAvalanches={this._urlAvalanches}
                />
            </MuiThemeProvider>, document.getElementById(this._domId)
        );
    }
}

module.exports = Avalanches;