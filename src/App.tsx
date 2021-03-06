import * as React from 'react'
import * as Immutable from 'immutable'
import {connect} from 'react-redux'
import {ImmutableObject} from './ImmutableObject'
import './App.css'

const logo = require('./logo.svg')

interface Props {
    state: Immutable.Map<string, ImmutableObject>
    updateMessage: (event: React.FormEvent<HTMLInputElement>) => void
}

function App(props: Props) {
    const message = props.state.get('message') || ''
    const foo = props.state.get('foo') || ''
    
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Hello, world!</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
            <div id="foo">{foo}</div>
            <input type="text" value={message} onChange={props.updateMessage}/>
        </div>
    )
}

function mapStateToProps(state: Immutable.Map<string, ImmutableObject>) {
    return {state}
}

export default connect(mapStateToProps)(App)
