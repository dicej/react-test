import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Immutable from 'immutable'
import {Provider} from 'react-redux'
import App from './App'
import reducer from './Reducer'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(app, Immutable.fromJS({ message: "Squeamish Ossifrage" }))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
)

registerServiceWorker()
