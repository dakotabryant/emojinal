import firebase from 'firebase';
import store from '../store';

const provider = new firebase.auth.GoogleAuthProvider();

export const initiateLogIn = () => ({
  type: 'INITIATE_LOGIN'
});
export const showLoginForm = () => ({
  type: 'SHOW_LOGIN_FORM'
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
