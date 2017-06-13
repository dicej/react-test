import * as React from 'react'
import * as Immutable from 'immutable'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {mount} from 'enzyme'
import App from './App'
import reducer from './Reducer'
import {Verb} from './Action'
const diff = require('immutablediff')

it('knows the magic words', () => {
    const magic = 'Squeamish Ossifrage'
    const store = createStore(reducer, Immutable.fromJS({ message: magic,
                                                          foo: '' }))
    const element = (
        <Provider store={store}>
            <App />
        </Provider>
    )
    
    expect(mount(element).find('h2').text()).toEqual(magic)
})

it('knows when the magic words change', () => {
    const originalMagic = 'Squeamish Ossifrage'
    const originalFoo = 'Zanzibar'
    const original = Immutable.fromJS({ message: originalMagic,
                                        foo: originalFoo })
    const store = createStore(reducer, original)
    const element = (
        <Provider store={store}>
            <App />
        </Provider>
    )

    const updatedMagic = 'Oldoinyo Lengai';
    const updated = original.set('message', updatedMagic);
    
    expect(mount(element).find('h2').text()).toEqual(originalMagic)
    expect(mount(element).find('#foo').text()).toEqual(originalFoo)
    
    store.dispatch({ type: Verb.Patch,
                     patch: diff(original, updated) })
    
    expect(mount(element).find('h2').text()).toEqual(updatedMagic)
    expect(mount(element).find('#foo').text()).toEqual(originalFoo)
})
