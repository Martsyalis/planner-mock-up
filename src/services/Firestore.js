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

function addDailyExpenseById(type, price, id) {
  let updateArray = firebase.firestore.FieldValue.arrayUnion;
  return db
    .collection('dailyExpenses')
    .doc(id)
    .update({
      expensesArray: updateArray({
        type: type,
        price: price,
        date: new Date()
      })
    })
    .then(docRef => 'success')
    .catch(error => {
      console.error('Error adding document: ', error);
    });
}

function getDailyExpensesById(id) {
  return db
    .collection('dailyExpenses')
    .doc(id)
    .get()
    .then(snapShot => {
      return snapShot
        .data()
        .expensesArray.map(a => ({
          ...a,
          date: a.date.toDate()
        }))
        .reverse();
    })
    .catch(err => console.error('error in getDailyExpesnes: ', err));
}

function getBudgetById(id) {
  return db
    .collection('budget')
    .doc(id)
    .get()
    .then(snapshot => {
      return snapshot.data();
    })
    .catch(err => console.error('error in getBudgetById: ', err));
}

function setBudgetById(newBudget, id) {
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

function getAllMonthlyExpensesById(id) {
  return db
    .collection('monthlyExpenses')
    .doc(id)
    .get()
    .then(snapShot => snapShot.data())
    .catch(err => console.error('error in getAllMonthlyExpensesById: ', err));
}

function addMonthlyExpense(expense, id) {
  return db
    .collection('monthlyExpenses')
    .doc(id)
    .update(expense)
    .then(() => 'added')
    .catch(err => console.log('error in addMonthlyExpense is:', err));
}

function removeMonthlyExpense(expense, id) {
  let object = {};
  object[expense] = firebase.firestore.FieldValue.delete();
  return db
    .collection('monthlyExpenses')
    .doc(id)
    .update(object)
    .then(() => 'removed')
    .catch(err => console.log('error in removeMonthlyExpense is:', err));
}

async function initiateUser(uid, email) {
  try {
    await db
      .collection('budget')
      .doc(uid)
      .set({ monthlyBudget: 0 });
    await db
      .collection('dailyExpenses')
      .doc(uid)
      .set({ expensesArray: [] });
    await db
      .collection('monthlyExpenses')
      .doc(uid)
      .set({ example: '0' });
    await db
      .collection('users')
      .doc(uid)
      .set({ email });
    return { uid, email };
  } catch (err) {
    console.log('error is: ', err);
  }
}

function getExpensesforChart(id, includeDaily, includeMonthly) {
  let result = [];
  return Promise.all([
    includeDaily &&
      db
        .collection('dailyExpenses')
        .doc(id)
        .get(),
    includeMonthly && getAllMonthlyExpensesById(id)
  ])
    .then(([dailySnapshot, monthlyObj]) => {
      if (includeDaily)
        result = [
          ...result,
          ...aggregateArray(dailySnapshot.data().expensesArray)
        ];
      if (includeMonthly) {
        for (let key in monthlyObj) {
          result.push({ id: key, value: parseFloat(monthlyObj[key]) });
        }
      }
      return result;
    })
    .catch(err => console.error('error in getDailyExpesnes: ', err));
}

function aggregateArray(arr) {
  let aggregatedArray = [];
  let reduced = arr.reduce((acc, val) => {
    if (!acc[val.type]) {
      acc[val.type] = parseFloat(val.price);
    } else {
      acc[val.type] += parseFloat(val.price);
    }
    return acc;
  }, {});
  for (let key in reduced) {
    aggregatedArray.push({ value: reduced[key], id: key });
  }
  return aggregatedArray;
}

export {
  addDailyExpenseById,
  getDailyExpensesById,
  getBudgetById,
  setBudgetById,
  getAllMonthlyExpensesById,
  addMonthlyExpense,
  removeMonthlyExpense,
  initiateUser,
  getExpensesforChart
};
