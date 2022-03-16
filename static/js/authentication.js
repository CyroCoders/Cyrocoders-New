function createUser(email, password) {
    app.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

function authenticateUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

function signOut() {
    firebase.auth().signOut();
}