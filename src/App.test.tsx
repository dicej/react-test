import * as React from 'react'
import * as Immutable from 'immutable'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {mount} from 'enzyme'
import App from './App'
import reducer from './Reducer'

it('knows the magic words', () => {
    const magic = 'Squeamish Ossifrage'
    const store = createStore(reducer, Immutable.fromJS({ message: magic }))
    const element = (
        <Provider store={store}>
            <App />
        </Provider>
    )
    
    expect(mount(element).find('h2').text()).toEqual(magic)
})
