import { createUser, authenticateUser, signOutUser } from "/js/authentication.js";

var user, errorCode, errorMessage;

document.querySelector("#signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    const password2 = document.querySelector("#signup-password2").value;
    if (password === password2) {
        createUser(email, password)
        .then((userCredential) => {
            user = userCredential.user;
        })
            .catch((error) => {
            errorCode = error.code;
            errorMessage = error.message;
            console.log(errorMessage)
        });
    }
});
document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#logim-password").value;
    authenticateUser(email, password);
});