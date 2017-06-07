import * as React from 'react'
import * as Immutable from 'immutable'
import {connect} from 'react-redux'
import './App.css'

const logo = require('./logo.svg')

interface StateProps {
    state: Immutable.Map<string, any>
}

function App(props: StateProps) {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>{props.state.get('message')}</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
        </div>
    )
}

function mapStateToProps(state: Immutable.Map<string, any>) {
    return {state}
}

export default connect(mapStateToProps)(App)
