import './Firestore';
import firebase from 'firebase';
import { initiateUser } from '../services/Firestore';

function signUp(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => initiateUser(user.uid, user.email))
    .catch(err => console.log('error on signUp: ', err));
}

function signIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => ({ uid: user.uid, email: user.email }))
    .catch(err => console.log('error in sign in: ', err));
}

function signOut() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('signed out');
    })
    .catch(error => console.log('error in catch: ', error));
}

function listenForAuthChange(callback) {
  firebase.auth().onAuthStateChanged(user => callback(user));
}
function getCurrentUser() {
  return firebase.auth().currentUser;
}
export { signUp, signIn, signOut, listenForAuthChange };
