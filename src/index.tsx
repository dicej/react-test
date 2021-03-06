import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Immutable from 'immutable'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App'
import reducer from './Reducer'
import Action, {Verb} from './Action'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const ReconnectingWebSocket = require('reconnecting-websocket')

const store = createStore(reducer, Immutable.fromJS({}))

const socket = new ReconnectingWebSocket('ws://localhost:8290');

socket.addEventListener('message', (event: MessageEvent) => {
    const action = JSON.parse(event.data)
    store.dispatch({ type: action.type,
                     patch: Immutable.fromJS(action.patch) })
})

function dispatch(action: Action) {
    socket.send(JSON.stringify({ type: action.type,
                                 patch: action.patch.toJS() }))
    store.dispatch(action)
}

function updateMessage(event: React.FormEvent<HTMLInputElement>) {
    dispatch({ type: Verb.Update,
               patch: Immutable.fromJS([{ op: 'replace',
                                          path: '/message',
                                          value: event.currentTarget.value }]) })
}

ReactDOM.render(
    <Provider store={store}>
        <App state={store.getState()} updateMessage={updateMessage} />
    </Provider>,
    document.getElementById('root') as HTMLElement
)

registerServiceWorker()
