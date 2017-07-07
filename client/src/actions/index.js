import firebase from 'firebase';
import store from '../store';

const cloudFunctions = 'https://us-central1-emojinal-61d05.cloudfunctions.net/';

const provider = new firebase.auth.GoogleAuthProvider();
export const showLoginForm = () => ({
  type: 'SHOW_LOGIN_FORM'
});
export const logOut = () => ({
  type: 'LOG_OUT'
});

export const userLoginRequest = () => ({
  type: 'USER_LOGIN_REQUEST'
});
export const userLoginSuccess = user => {
  const jsonUser = user.toJSON();
  return {
    type: 'USER_LOGIN_SUCCESS',
    user: {
      uid: jsonUser.uid,
      displayName: jsonUser.displayName,
      photo: jsonUser.photoURL,
      email: jsonUser.email
    }
  };
};
export const userLoginFailure = () => ({
  type: 'USER_LOGIN_FAILURE'
});
export const getQuestion = uid => {
  fetch(`${cloudFunctions}getFirst`).then(res => {});
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const createMockData = user => {
  fetch(`${cloudFunctions}createMockData`, {
    headers,
		method: 'put',
    body: JSON.stringify(user)
  }).then(res => {
		console.log('====================================');
		console.log('I came back!');
		console.log('====================================');
    return res;
  });
};

export const googleLoginRequest = () => {
  store.dispatch(userLoginRequest());
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {})
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });
};
