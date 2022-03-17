import { createUser, authenticateUser, signOutUser } from "/js/authentication.js";

var user, errorCode, errorMessage;

document.querySelector("#account").addEventListener("click", function() {
    if (user == null || user == undefined || user == "") {
        document.querySelector("#signup").classList.add("active");
    } else {
        document.location.href = "/profile";
    }
});

document.querySelector("#signup").addEventListener("click", function() {
    document.querySelector("#signup").classList.remove("active");
});

document.querySelector("#signup-form").addEventListener("click", function(e) {
    e.stopPropagation();
});

document.querySelector("#login-form").addEventListener("submit", function(e) {
    e.stopPropagation();
});

document.querySelector("#login").addEventListener("click", function() {
    document.querySelector("#login").classList.remove("active");
});

document.querySelectorAll(".to-signup").forEach((element) => {
    element.addEventListener("click", function() {
        document.querySelector("#login").classList.remove("active");
        document.querySelector("#signup").classList.add("active");
    });
});

document.querySelectorAll(".to-login").forEach((element) => {
    element.addEventListener("click", function() {
        document.querySelector("#signup").classList.remove("active");
        document.querySelector("#login").classList.add("active");
    });
});

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