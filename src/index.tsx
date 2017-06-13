import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Immutable from 'immutable'
import {Provider} from 'react-redux'
import App from './App'
import reducer from './Reducer'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(app, Immutable.fromJS({ message: "Squeamish Ossifrage" }))

const socket = new WebSocket('ws://localhost:8290');

socket.on('open', (event: Event) => {
    socket.send(JSON.stringify({ type: Verb.Replace,
                                 state: store.getState().toJS() }))
})

socket.on('message', (event: MessageEvent) => {
    const action = JSON.parse(event.data)
    store.dispatch({ type: action.type,
                     patch: Immutable.fromJS(action.patch) })
})

function dispatch(action: Action) {
    socket.send(JSON.stringify({ type: action.type,
                                 patch: action.patch.toJS() }))
    store.dispatch(action)
}

function updateMessage(event: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: Verb.Patch,
               patch: Immutable.fromJS([{ op: 'replace',
                                          path: '/message',
                                          value: event.target.value }]) })
}

ReactDOM.render(
    <Provider store={store}>
        <App updateMessage={updateMessage} />
    </Provider>,
    document.getElementById('root') as HTMLElement
)

registerServiceWorker()
