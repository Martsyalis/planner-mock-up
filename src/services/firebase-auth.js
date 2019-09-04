import './Firestore';
import firebase from 'firebase';

function SignUp(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log('response is: ', response);
    });
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}
export { SignUp };
