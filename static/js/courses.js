import { db, collection, getDocs } from "/js/firebase-config.js";
var Courses = collection(db, "CourseList");

var premiumCourses = [];
var freeCourses = [];

getDocs(Courses).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc.data().premium == true) {
            premiumCourses.push(doc.data());
        } else {
            freeCourses.push(doc.data());
        }
    });
});

export { premiumCourses, freeCourses };