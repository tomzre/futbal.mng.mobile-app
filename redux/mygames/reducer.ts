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

export const CREATE_NEWGAME: string = 'futbal-mng/games/CREATE'
export const CREATE_NEWGAME_SUCCESS: string = 'futbal-mng/games/CREATE_SUCCESS'
export const CREATE_NEWGAME_FAIL: string = 'futbal-mng/games/CREATE_FAIL'

const initialState = {
    games: [],
    game: {},
    setAvailability: {
        availability: null,
        error: null,
        loading: false
    },
    createNewGame: {
        game: null,
        error: null,
        loading: false
    }
}

export default function reducer(state = initialState, action) {
    let error;
    switch (action.type) {
        case GET_MYGAMES:
            return { ...state, loading: true };
        case GET_MYGAMES_SUCCESS:
            console.log('success');
            console.log(action.payload.data);
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
                error: `Error while fetching game.`
            };
        case SET_AVAILABILITY:
            return {
                ...state,
                setAvailability: {
                    ...state.setAvailability,
                    loading: true
                }
            };
        case SET_AVAILABILITY_SUCCESS:
            return {
                ...state,
                setAvailability: {
                    post: action.payload,
                    error: null,
                    loading: false
                }
            };
        case SET_AVAILABILITY_FAIL:
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                setAvailability: { availability: null, error: error, loading: false }
            };
        case CREATE_NEWGAME:
            return {
                ...state,
                createNewGame: {
                    ...state.createNewGame,
                    loading: true
                }
            };
        case CREATE_NEWGAME_SUCCESS:
            return {
                ...state,
                createNewGame: {
                    post: action.payload,
                    error: null,
                    loading: false
                }
            };
        case CREATE_NEWGAME_FAIL:
            return {
                ...state,
                createNewGame: { game: null, error: error, loading: false }
            };
        default:
            return state;
    }
}

//action creators
export function listGames(user) {
    console.log(user);
    return {
        type: GET_MYGAMES,
        payload: {
            request: {
                url: `api/users/${user}/games`
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

export function setAvailability(props, gameId, attendeeId) {
    console.log(props);
    return {
        type: SET_AVAILABILITY,
        payload: {
            request: {
                method: 'put',
                data: props,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `api/games/${gameId}/attendees/${attendeeId}/available`
            }
        }
    };
}

export function createNewGame(payload) {
    return {
        type: CREATE_NEWGAME,
        payload: {
            request: {
                method: 'post',
                data: payload,
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `api/games`
            }
        }
    };
}
