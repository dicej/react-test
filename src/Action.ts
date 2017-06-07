import * as Immutable from 'immutable'

export enum Verb {
    Patch,
    Replace
}

interface Action {
    type: Verb
    patch?: Immutable.List<any>
    state?: Immutable.Map<string, any>
}

export default Action
