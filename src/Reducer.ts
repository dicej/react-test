import * as Immutable from 'immutable'
import Action, {Verb} from './Action'
import {ImmutableObject} from './ImmutableObject'
const patch = require('immutablepatch')

export default function(state: Immutable.Map<string, ImmutableObject>, action: Action) {
    switch (action.type) {
    case Verb.Update:
        return patch(state, action.patch)
    case Verb.Replace:
        return patch(Immutable.fromJS({}), action.patch)
    default:
        return state
    }
}
