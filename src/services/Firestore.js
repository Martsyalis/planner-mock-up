import firebase from 'firebase/app';
import moment from 'moment';

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
    .then(function(docRef) {})
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}

function getDailyExpenses() {
  return (
    db
      .collection('dailyExpenses')
      .orderBy('date')
      .get()
      // gives us wierd snapShot
      .then(snapShot => {
        let resultsArray = [];
        // snapshot comes with forEach method
        snapShot.forEach(result => {
          let formatedDate = moment(result.data().date.toDate()).format(
            'MMM Do'
          );
          let resultObject = { ...result.data(), ...{ date: formatedDate } }; // get the object and switch date to workable format
          resultsArray.push(resultObject);
        });
        return resultsArray;
      })
      .catch(err => console.error('error in getDailyExpesnes: ', err))
  );
}

function getBudgetById(id = 'Yp8RFwZgIHrbRrHf0mIs') {
  return db
    .collection('budget')
    .doc(id)
    .get()
    .then(snapshot => {
      return snapshot.data();
    })
    .catch(err => console.error('error in getBudgetById: ', err));
}

function setBudgetById(newBudget, id = 'Yp8RFwZgIHrbRrHf0mIs') {
  return db
    .collection('budget')
    .doc(id)
    .set({
      monthlyBudget: newBudget
    })
    .then(() => {
      return 'no error';
    })
    .catch(err => console.error('error in setBudgetById: ', err));
}

function getAllMonthlyExpensesById(id = 'uYJ87RqNL2vCFrbS8BEz') {
  return db
    .collection('monthlyExpenses')
    .doc(id)
    .get()
    // gives us wierd snapShot
    .then(snapShot => snapShot.data())
    .catch(err => console.error('error in getAllMonthlyExpensesById: ', err));
}

function addMonthlyExpense(expense, id="uYJ87RqNL2vCFrbS8BEz"){
  return db.collection('monthlyExpenses')
  .doc(id)
  .update(expense)
  .then(() =>'added')
  .catch(err => console.log('error in addMonthly is:', err));
}

export { addDailyExpense, getDailyExpenses, getBudgetById, setBudgetById, getAllMonthlyExpensesById, addMonthlyExpense };
