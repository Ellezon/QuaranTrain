import { googleProvider, authentication } from '@/utils/firebase.util.js';

export const emailSignUp = (email, password) => {
  return new Promise(function (resolve, error) {
    authentication.createUserWithEmailAndPassword(email, password)
      .then(doc => {
        resolve(doc.data());
      })
      .catch(err => {
        resolve(err);
      });
  });
}

export const emailSignIn = (email, password) => {
    return authentication.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
      throw error;
    })
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
