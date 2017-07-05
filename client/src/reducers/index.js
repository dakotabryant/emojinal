const initialState = {
    loading: null,
    loggingIn: null,
    error: null,
    currentUser: {
        name: '',
        uid: '',
    },
    currentQuestion: 0,
    questions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
};

export default reducer;