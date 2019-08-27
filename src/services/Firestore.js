import firebase from 'firebase';

import 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  appId: process.env.appId
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function addDailyExpense(type, price) {
  db.collection('dailyExpenses')
    .add({
      type: type,
      price: price,
      date: new Date()
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}

function getDailyExpenses() {
  return db.collection('dailyExpenses')
  .get()
  .then(results => results)
  .catch(err => console.log('error in getDailyExpesnes: ', err));
}

export { addDailyExpense, getDailyExpenses };
