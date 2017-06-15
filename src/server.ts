import * as Immutable from 'immutable'
import Action, {Verb} from './Action'
import {ImmutableObject} from './ImmutableObject'
import reduce from './Reducer'
import * as ws from 'ws'

const diff = require('immutablediff')

const server = new ws.Server({ port: 8290 })

let state: Immutable.Map<string, ImmutableObject>
    = Immutable.fromJS({ message: 'Buongiarno' })

interface Connection {
    socket: ws
    state: Immutable.Map<string, ImmutableObject>
}

const connections: Connection[] = []

function dispatch(action: Action) {
    state = reduce(state, action)

    connections.forEach(connection => {
        const patch = diff(connection.state, state)
        if (patch.size > 0) {
            connection.socket.send(JSON.stringify({ type: Verb.Update,
                                                    patch: patch.toJS() }))
        }
    })
}

server.on('connection', socket  => {
    connections.push({ socket, state })

    socket.send(JSON.stringify({ type: Verb.Replace,
                                 patch: diff(Immutable.fromJS({}),
                                             state).toJS() }))
    
    socket.on('message', message => {
        const action = JSON.parse(message as string)
        dispatch({ type: action.type,
                   patch: Immutable.fromJS(action.patch) })
    })
})
