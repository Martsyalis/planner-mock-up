import './Firestore';
import firebase from 'firebase';
import { initiateUser } from '../services/Firestore';

function SignUp(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
        console.log('something is up');
      return initiateUser(response.user.uid, email);
    })
    .catch(err => console.log('error on signUp: ', err));
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}
export { SignUp };
