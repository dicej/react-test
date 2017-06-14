import * as Immutable from 'immutable'
import {ImmutableObject} from './ImmutableObject'

export enum Verb {
    Update,
    Replace
}

interface Action {
    type: Verb
    patch: Immutable.List<ImmutableObject>
}

export default Action
