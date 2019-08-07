// MY_GAMES screen
export const SELECT_GAME: string = 'futbal-mng/games/SELECT';
export const REQUEST_GAME: string = 'futbal-mng/games/REQUEST_GAME';
export const RECEIVE_GAME: string = 'futbal-mng/games/RECEIVE_GAME';


export default function reducer(
    state = {
        isFetching: false,
        didInvalidate: false,
        game: {}
    },
    action) {
    switch (action.type) {
        case SELECT_GAME:
            return action.game;
        case REQUEST_GAME:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
                game: action.payload.data
            };
        case RECEIVE_GAME:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}

export function selectGame(game) {
    return {
        type: SELECT_GAME,
        game
    }
}

export function requestGame(game) {
    return {
        type: REQUEST_GAME,
        game
    }
}

export function receiveGame(game, json) {
    return {
        type: RECEIVE_GAME,
        game,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}