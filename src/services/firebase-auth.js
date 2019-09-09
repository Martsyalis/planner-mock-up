import './Firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import { initiateUser } from '../services/Firestore';

function signUp(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => initiateUser(user.uid, user.email));
}

function signIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => ({ uid: user.uid, email: user.email }));
}

function signOut() {
  return firebase
    .auth()
    .signOut()
    .then()
    .catch(error => console.log('error in catch: ', error));
}

function listenForAuthChange(callback) {
  firebase.auth().onAuthStateChanged(user => callback(user));
}
function getCurrentUser() {
  return firebase.auth().currentUser;
}
export { signUp, signIn, signOut, listenForAuthChange, getCurrentUser };
