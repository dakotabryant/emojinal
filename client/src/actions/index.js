import firebase from 'firebase';
import store from '../store';

const provider = new firebase.auth.GoogleAuthProvider();

export const initiateLogIn = () => ({
    type: 'INITIATE_LOGIN'
})
export const cancelLogIn = () => ({
    type: 'CANCEL_LOGIN'
})

export const userLoginRequest = () => ({
    type: 'USER_LOGIN_REQUEST'
})
export const userLoginSuccess = (user) => ({
    type: 'USER_LOGIN_SUCCESS',
    user
})
export const userLoginFailure = () => ({
    type: 'USER_LOGIN_FAILURE'
})

export const googleLoginRequest = () => {
    store.dispatch(userLoginRequest());
    firebase.auth().signInWithPopup(provider).then((result) => {
        let token = result.credential.accessToken;
        let user = result.user;
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        return store.dispatch(userLoginSuccess({user}))
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
    });
    // firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRidirectResult().then((data) => {
    //    if (data.credential) {
    //        console.log('====================================');
    //        console.log(data.credential.accessToken);
    //        console.log('====================================');
    //    }
    //    let user = data.user;
    //    console.log('====================================');
    //    console.log('hit');
    //    console.log('====================================');
    //    return store.dispatch(userLoginSuccess(user)) 
    // })
    // .catch((error) => { 
    //     let errorCode = error.code;
    //     let errorMessge = error.message;
    //     let email = error.email;
    //     let credential = error.credential;
    // })
};