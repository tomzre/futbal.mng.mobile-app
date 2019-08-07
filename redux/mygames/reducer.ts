//actions
export const GET_MYGAMES: string = 'futbal-mng/games/LOAD';
export const GET_MYGAMES_SUCCESS: string = 'futbal-mng/games/LOAD_SUCCESS';
export const GET_MYGAMES_FAIL: string = 'futbal-mng/games/LOAD_FAIL';

export const INVALIDATE_MYGAMES: string = 'futbal-mng/games/INVALIDATE_MYGAMES';

export const SELECT_GAME: string = 'futbal-mng/games/SELECT';

export const GET_GAME: string = 'futbal-mng/games/GAME';
export const GET_GAME_SUCCESS: string = 'futbal-mng/games/GAME_SUCCESS';
export const GET_GAME_FAIL: string = 'futbal-mng/games/GAME_FAIL';

export const SET_AVAILABILITY: string = 'futbal-mng/games/AVAILABILITY';
export const SET_AVAILABILITY_SUCCESS: string = 'futbal-mng/games/AVAILABILITY_SUCCESS';
export const SET_AVAILABILITY_FAIL: string = 'futbal-mng/games/AVAILABILITY_FAIL';

const initialState = { games: [], game: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MYGAMES:
            return { ...state, loading: true };
        case GET_MYGAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                games: action.payload.data
            };
        case GET_MYGAMES_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching my games.'
            };
        case GET_GAME:
            return {
                ...state,
                loading: true
            };
        case GET_GAME_SUCCESS:
            return {
                ...state,
                loading: false,
                game: action.payload.data
            };
        case GET_GAME_FAIL:
            return {
                ...state,
                loading: false,
                error: `Error while fetching game. ${JSON.stringify(state)}`
            };
        case SET_AVAILABILITY:
            return {
                ...state,
                loading: true
            };
        case SET_AVAILABILITY_SUCCESS:
            return {
                ...state,
                loading: true
            };
        case SET_AVAILABILITY:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

//action creators
export function listGames(user) {
    return {
        type: GET_MYGAMES,
        payload: {
            request: {
                url: `api/users/${user}/mygames`
            }
        }
    };
}

export function invalidateGames(games) {
    return {
        type: INVALIDATE_MYGAMES,
        games
    };
}

export function receiveGame(gameId: string) {
    return {
        type: GET_GAME,
        payload: {
            request: {
                url: `api/games/${gameId}`
            }
        }
    };
}
