import { googleProvider, authentication } from '@/utils/firebase.util.js';

export const emailSignUp = (email, password) => {
  authentication.createUserWithEmailAndPassword(email, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

export const emailSignIn = (email, password) => {
  authentication.signInWithEmailAndPassword(email, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

export const googleSignIn = () => {
  authentication.signInWithRedirect(googleProvider);
}

export const googleSignOut = () => {
  authentication.signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    console.log(error);
  });
}
