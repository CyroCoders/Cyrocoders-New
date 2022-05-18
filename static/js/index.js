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
            <span>${course.name}</span>
            <p>${course.description}</p>
            <div class="details">
                <ul>
                    <li class="last-edited">
                        <ion-icon name="calendar-clear-outline"></ion-icon>
                        <span>
                            ${course.lastEdited}
                        </span>
                    </li>
                    <li class="writer">
                        <ion-icon name="pencil-outline"></ion-icon>
                        <span>
                            ${course.writer}
                        </span>
                    </li>
                    <li class="tags">
                        <ion-icon name="pricetag-outline"></ion-icon>
                        <span>
                            <ul></ul>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    `;
    var tagsElement = courseElement.querySelector(".tags span ul");
    course.tags.forEach((tag) => {
        var tagElement = document.createElement("li");
        tagElement.innerHTML = "<a href='/tag/" + tag + "'>" + tag + "</a>";
        tagsElement.appendChild(tagElement);
    });
    courseElement.addEventListener("click", function(event) {
        var target = event.target;
        while(!target.classList.contains("course")) {
            target = target.parentNode;
        }
        document.location.href = "/course?id=" + target.id;
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
            <span>${lesson.name}</span>
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
        document.location.href = "/lesson?id=" + event.target.id;
    });
    document.querySelector("#freeLessonsContent").appendChild(lessonElement);
});