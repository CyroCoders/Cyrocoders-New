import { createUser, authenticateUser, signOutUser } from "/js/authentication.js";
import { premiumCourses, freeLessons } from "/js/courses.js";


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

document.querySelector("#login-form").addEventListener("click", function(e) {
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
            document.querySelector("#signup").classList.remove("active");
        })
            .catch((error) => {
            errorCode = error.code;
            errorMessage = error.message;
            document.querySelector("#signup-form span.error").innerHTML = errorMessage[22].toUpperCase() + errorMessage.slice(22,-2).replaceAll("-"," ").slice(1) + ".";
            document.querySelector("#signup-form span.error").style.display = "block";
        });
    }
});
document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#logim-password").value;
    authenticateUser(email, password)
    .then((userCredential) => {
        user = userCredential.user;
        document.querySelector("#login").classList.remove("active");
    })
        .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
        document.querySelector("#login-form span.error").innerHTML = errorMessage[22].toUpperCase() + errorMessage.slice(22,-2).replaceAll("-"," ").slice(1) + ".";
        document.querySelector("#login-form span.error").style.display = "block";
    });
});

premiumCourses.forEach((course) => {
    var courseElement = document.createElement("div");
    courseElement.id = course.id;
    courseElement.classList.add("course");
    courseElement.classList.add("box");
    courseElement.classList.add("vertical");
    courseElement.innerHTML = `
        <div class="image">
            <img src="${course.thumbnail}" alt="${course.name}">
        </div>
        <div class="info">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
        </div>
    `;
    var tagsElement = document.createElement("ul");
    course.tags.forEach((tag) => {
        var tagElement = document.createElement("li");
        tagElement.innerHTML = tag;
        tagsElement.appendChild(tagElement);
    });
    courseElement.appendChild(tagsElement);
    courseElement.addEventListener("click", function(event) {
        console.log(event)
        document.location.href = "/course?id=" + event.target.id;
    });
    document.querySelector("#premiumCoursesContent").appendChild(courseElement);
});

freeLessons.forEach((lesson) => {
    var lessonElement = document.createElement("div");
    lessonElement.id = lesson.id;
    courseElement.classList.add("lesson");
    courseElement.classList.add("box");
    courseElement.classList.add("vertical");
    lessonElement.innerHTML = `
        <div class="image">
            <img src="${lesson.thumbnail}" alt="${lesson.name}">
        </div>
        <div class="info">
            <h3>${lesson.name}</h3>
            <p>${lesson.description}</p>
        </div>
    `;
    var tagsElement = document.createElement("ul");
    lesson.tags.forEach((tag) => {
        var tagElement = document.createElement("li");
        tagElement.innerHTML = tag;
        tagsElement.appendChild(tagElement);
    });
    lessonElement.appendChild(tagsElement);
    lessonElement.addEventListener("click", function(event) {
        console.log(event)
        document.location.href = "/lesson?id=" + event.target.id;
    });
    document.querySelector("#freeLessonsContent").appendChild(lessonElement);
});