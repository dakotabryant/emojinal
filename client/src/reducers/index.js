const initialState = {
    loading: null,
    loggingIn: false,
    loggedIn: false,
    error: null,
    currentUser: {},
    currentQuestion: {},
    questions: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                loggedIn: true,
                currentUser: action.user
            }
        case 'USER_LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                loggedIn: false
            }
        case 'INITIATE_LOGIN':
            return {
                ...state,
                loggingIn: true
            }
        case 'CANCEL_LOGIN':
            return {
                ...state,
                loggingIn: false,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;