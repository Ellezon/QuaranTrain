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
  return new Promise(function (resolve, error) {
     authentication.signInWithEmailAndPassword(email, password)
     .then(doc => {
      resolve(doc.data());
    })
    .catch(err => {
      resolve(err);
    });
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
