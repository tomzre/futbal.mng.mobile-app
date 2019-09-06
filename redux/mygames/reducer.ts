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

export const UPDATE_PLACE: string = 'futbal-mng/games/UPDATE_PLACE';
export const UPDATE_PLACE_SUCCESS: string = 'futbal-mng/games/UPDATE_PLACE_SUCCESS';
export const UPDATE_PLACE_FAIL: string = 'futbal-mng/games/UPDATE_PLACE_FAIL';

export const CREATE_GAME: string = 'futbal-mng/games/CREATE_GAME';
export const CREATE_GAME_SUCCESS: string = 'futbal-mng/games/CREATE_GAME_SUCCESS';
export const CREATE_GAME_FAIL: string = 'futbal-mng/games/CREATE_GAME_FAIL';

const initialState = {
    games: [],
    game: {},
    setAvailability: {
        availability: null,
        error: null,
        loading: false
    },
    place: {}
}

export default function reducer(state = initialState, action) {
    let error;
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
                    availability: action.payload,
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
        case UPDATE_PLACE:
            return {
                ...state,
                newPlace: {
                    ...state.place,
                    loading: true
                }
            };
        case UPDATE_PLACE_SUCCESS:
            return {
                ...state,
                newPlace: {
                    place: action.payload,
                    error: null,
                    loading: false
                }
            };
        case UPDATE_PLACE_FAIL:
         error = action.payload || { message: action.payload.message };
            return {
                ...state,
                newPlace: {
                    place: null,
                    error: error,
                    loading: false
                }
            };
        case CREATE_GAME:
            return {
                ...state,
                newGame: {
                    ...state.game,
                    loading: true
                }
            };
        case CREATE_GAME_SUCCESS:
            return {
                ...state,
                newGame: {
                    game: action.payload,
                    error: null,
                    loading: false
                }
            };
        case CREATE_GAME_FAIL:
         error = action.payload || { message: action.payload.message };
            return {
                ...state,
                newGame: {
                    game: null,
                    error: error,
                    loading: false
                }
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

//token can be passed as param
export function setAvailability(props, gameId, attendeeId) {
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

export function updatePlace(newPlace, gameId) {
    return {
        type: UPDATE_PLACE,
        payload: {
            request: {
                method: 'put',
                data: newPlace,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `api/games/${gameId}/places`
            }
        }
    };
}

export function createGame(newGame) {
    return {
        type: CREATE_GAME,
        payload: {
            request: {
                method: 'post',
                data: newGame,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `api/games`
            }
        }
    };
}
