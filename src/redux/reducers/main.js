import { SET_GAMEINFO } from "../actions/gameinfoaction"

export function main(state = {game_indices: []}, action) {
    switch (action.type) {
        case SET_GAMEINFO:
            return {...state, game_indices:action.text}
            default:
                return state
    }
}