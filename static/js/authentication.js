import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "/js/firebase-config.js";

const auth = getAuth();

function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

function authenticateUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

function signOutUser() {
    signOut(auth);
}

export { createUser, authenticateUser, signOutUser };