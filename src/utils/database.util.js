import { db } from '@/utils/firebase.util.js'

const studentsCollRef = db.collection('students');
const trainersCollRef = db.collection('trainers');
export const addStudent = (userId, name, surname, photoUrl, email) => {
  const docRef = studentsCollRef.doc(userId);
  const setStudent = docRef.set({
    name,
    surname,
    photoUrl,
    email
  }).then(ref => {
    console.log('Student added', ref);
  }).catch((err) => {
    console.log('Error adding student', err);
  });
  return Promise.all([setStudent]);
}

export function getStudent(userId) {
  return new Promise(function (resolve, error) {
    studentsCollRef.doc(userId).get()
      .then(doc => {
        resolve(doc.data());
      })
      .catch(err => {
        console.log('Error getting document', err);
        error(err);
      });
  });
}

export const addTrainer = (userId, name, photoUrl, email) => {
  const docRef = trainersCollRef.doc(userId);
  const setStudent = docRef.set({
    name,
    photoUrl,
    email
  }).then(ref => {
    console.log('Trainer added', ref);
  }).catch((err) => {
    console.log('Error adding trainer', err);
  });
  return Promise.all([setStudent]);
}

export const getTrainer = userId => {
  return trainersCollRef.doc(userId);
}
