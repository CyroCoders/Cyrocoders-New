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
firebase.auth().onAuthStateChanged(function(_user) {
    if (_user) {
        var user = _user;
    } else {
        var user = null;
    }
});

export { createUser, authenticateUser, signOutUser };