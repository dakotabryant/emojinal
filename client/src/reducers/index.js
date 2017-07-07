const initialState = {
  loading: false,
  error: null,
  showLoginForm: false,
  currentUser: {
    isLogged: false
  },
  currentQuestion: {
    correctAnswer: null,
    wrongAnswers: [],
    questionText: ''
  },
  questions: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'SHOW_LOGIN_FORM':
      return {
        ...state,
        showLoginForm: !state.showLoginForm
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        currentUser: {
          isLogged: true,
          ...action.user
        },
        showLoginForm: false
      };
    case 'USER_LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        loggedIn: false
      };
    case 'LOG_OUT':
      return {
        ...state,
        loading: false,
        currentUser: {
          isLogged: false
        }
      };
    case 'GET_QUESTION':
      return {
        ...state,
        loading: true
      };
    case 'GET_QUESTION_SUCCESS':
      return {
        ...state,
        loading: false,
        currentQuestion: {
          correctAnswer: action.question.answer,
          wrongAnswers: [...action.question.wrongAnswers],
          questionText: action.question.question
        }
      };
    case 'GET_QUESTION_FAILURE':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
