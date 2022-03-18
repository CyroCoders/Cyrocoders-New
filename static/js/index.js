import { premiumCourses, freeLessons } from "/js/courses.js";

premiumCourses.forEach((course) => {
    document.querySelector("#premiumCourses .empty").style.display = "none";
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
    document.querySelector("#freeLessons .empty").style.display = "none";
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