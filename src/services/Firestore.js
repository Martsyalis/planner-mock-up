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

function addDailyExpenseById(type, price, id = 'reLVZYmMLfMTJViomSPP') {
  let updateArray = firebase.firestore.FieldValue.arrayUnion;
  db.collection('dailyExpenses')
    .doc(id)
    .update({
      expensesArray: updateArray({
        type: type,
        price: price,
        date: new Date()
      })
    })
    .then(function(docRef) {})
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}

function getDailyExpensesById(id = 'reLVZYmMLfMTJViomSPP') {
  return (
    db
      .collection('dailyExpenses')
      .doc(id)
      .get()
      .then(snapShot => {
        return snapShot.data().expensesArray.map(a => ({
          ...a,
          date: moment(a.date.toDate()).format('MMM Do')
        }));
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
  return (
    db
      .collection('monthlyExpenses')
      .doc(id)
      .get()
      // gives us wierd snapShot
      .then(snapShot => snapShot.data())
      .catch(err => console.error('error in getAllMonthlyExpensesById: ', err))
  );
}

function addMonthlyExpense(expense, id = 'uYJ87RqNL2vCFrbS8BEz') {
  return db
    .collection('monthlyExpenses')
    .doc(id)
    .update(expense)
    .then(() => 'added')
    .catch(err => console.log('error in addMonthlyExpense is:', err));
}

function removeMonthlyExpense(expense, id = 'uYJ87RqNL2vCFrbS8BEz') {
  let object = {};
  object[expense] = firebase.firestore.FieldValue.delete();
  return db
    .collection('monthlyExpenses')
    .doc(id)
    .update(object)
    .then(() => 'removed')
    .catch(err => console.log('error in removeMonthlyExpense is:', err));
}

export {
  addDailyExpenseById,
  getDailyExpensesById,
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense,
  removeMonthlyExpense
};
