import { googleProvider, authentication } from '@/utils/firebase.util.js';
import * as dbFns from '@/utils/database.util.js';

export const emailSignUp = (email, password, firstName, lastName, userType) => {
  return new Promise(function (resolve, reject) {
    authentication.createUserWithEmailAndPassword(email, password)
      .then(doc => {
        if(doc.user.uid) {
          if (userType === 'isStudent') {
            dbFns.addStudent(doc.user.uid, firstName, lastName, '', email);
          } else {
              dbFns.addTrainer(doc.user.uid, firstName, lastName, '', email);
          }
        }
        resolve(doc);
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
  window.sessionStorage.setItem('googleLoginPending', 1);
  authentication.signInWithRedirect(googleProvider);
}

export const googleSignOut = () => {
  authentication.signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    console.log(error);
  });
}
