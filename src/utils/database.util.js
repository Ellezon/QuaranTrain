import { db } from '@/utils/firebase.util.js'

const studentsCollRef = db.collection('students');
const trainersCollRef = db.collection('trainers');

export const addStudent = (userId, name, photoUrl, email) => {
  const docRef = studentsCollRef.doc(userId);
  const setStudent = docRef.set({
    name,
    photoUrl,
    email
  }).then(ref => {
    console.log('Student added', ref);
  }).catch((err) => {
    console.log('Error adding student', err);
  });
  return Promise.all([setStudent]);
}

export const getStudent = userId => {
  const doc = studentsCollRef.doc(userId).get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
     return doc.data();
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
  return doc;
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
