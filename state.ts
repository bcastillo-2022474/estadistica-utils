import {State} from "./types";

let state: State | undefined;

export function setState(newState: State) {
    console.log("changing state")
    console.log({state, newState})
    state = newState;
}

export function getState() {
    return state;
}
