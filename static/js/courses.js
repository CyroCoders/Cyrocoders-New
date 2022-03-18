import { db, collection, getDocs } from "/js/firebase-config.js";
var Courses = collection(db, "CourseList");

var premiumCourses = [];
var freeLessons = [];

await getDocs(Courses).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc.data().premium == true) {
            premiumCourses.push(doc.data());
        } else {
            freeLessons.push(doc.data());
        }
    });
});

export { premiumCourses, freeLessons };