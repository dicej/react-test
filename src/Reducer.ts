import * as Immutable from 'immutable'
import Action, {Verb} from './Action'
import patch from 'immutablepatch'

export default function(state: Immutable.Map<string, any>, action: Action) {
    switch (action.type) {
    case Verb.Patch:
        return patch(state, action.patch)
    case Verb.Replace:
        return action.state
    default:
        return state
    }
}
