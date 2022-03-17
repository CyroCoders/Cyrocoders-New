import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "/js/firebase-config.js";

const auth = getAuth();

function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

function authenticateUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return [true, user];
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return [errorMessage, errorCode];
    });
}

function signOutUser() {
    signOut(auth);
}

export { createUser, authenticateUser, signOutUser };