export const SET_GAMEINFO = 'SET_GAMEINFO'

export function actionGetGameInfo(text) {
    return {
        type: SET_GAMEINFO,
        text
    }
}