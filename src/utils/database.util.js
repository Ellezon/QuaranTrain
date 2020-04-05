import { db } from '@/utils/firebase.util.js'

const studentsCollRef = db.collection('students');
const trainersCollRef = db.collection('trainers');
const videoCollRef = db.collection('videos');

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
        resolve(doc.id);
      })
      .catch(err => {
        console.log('Error getting student', err);
        error(err);
      });
  });
}

export const addTrainer = (userId, name, surname, photoUrl, email) => {
  const docRef = trainersCollRef.doc(userId);
  const setTrainer = docRef.set({
    name,
    surname,
    photoUrl,
    email
  }).then(ref => {
    console.log('Trainer added', ref);
  }).catch((err) => {
    console.log('Error adding trainer', err);
  });
  return Promise.all([setTrainer]);
}

export const getTrainer = userId => {
  return new Promise(function (resolve, error) {
    trainersCollRef.doc(userId).get()
      .then(doc => {
        resolve(doc.id);
      })
      .catch(err => {
        console.log('Error getting trainer', err);
        error(err);
      });
  });
}

export const addVideo = (userId, videoTitle) => {
  // Add a new document with a generated id.
  return new Promise(function (resolve, error) {
    videoCollRef.add({
      userId,
      videoTitle,
      isPlaying: false
    }).then(ref => {
      console.log('Video added with ID: ', ref.id);
      resolve(ref.id);
    }).catch((err) => {
      console.log('Error adding video', err);
      error(err);
    });
  });
}

export function getVideo(videoID) {
  return new Promise(function (resolve, error) {
    videoCollRef.doc(videoID).get()
      .then(doc => {
        resolve(doc.data());
      })
      .catch(err => {
        console.log('Error getting video', err);
        error(err);
      });
  });
}

export const updateVideoState = (videoID, isPlaying) => {
  // Add a new document with a generated id.
  return new Promise(function (resolve, error) {
    videoCollRef.doc(videoID)
    .update({
      isPlaying
    })
    .then(() => {
      console.log('Video updated');
      resolve();
    }).catch((err) => {
      console.log('Error updating video', err);
      error(err);
    });
  });
}
