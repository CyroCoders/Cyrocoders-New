import { db, doc, getDoc } from "/js/firebase-config.js";
const GET_attributes = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const id = GET_attributes.id;
let section_index = parseInt(GET_attributes.section);

if(isNaN(section_index)){
    section_index = 0;
}

const course = doc(db, "Courses", id);
var courseData;

await getDoc(course).then((querySnapshot) => {
    courseData = querySnapshot.data();
});

courseData.sections.forEach((section,index) => {
    var sec = document.createElement("div");
    sec.classList.add("section-label");
    sec.classList.add("button");
    sec.id = index;
    sec.innerHTML = section.name;
    document.querySelector("#sidebar").appendChild(sec);

    sec.addEventListener("click", (event) => {
        window.location.href = `/course?id=${id}&section=${event.target.id}`;
    });

    if(section_index == index){
        sec.classList.add("active");
    }
});

var section = courseData.sections[section_index];
document.querySelector("#youtube").innerHTML =  '<iframe src="https://www.youtube-nocookie.com/embed/' + section.youtube + '?autoplay=1&theme=dark&autohide=2&cc_load_policy=1&modestbranding=1&rel=0"frameborder="0"></iframe>'

section.content.forEach(function(content){
    var sec = document.createElement("section");
    sec.classList.add("section");
    if (content.type == "text") {
        sec.innerHTML = content.value;
        sec.classList.add("text");
    } else if (content.type == "code") {
        sec.innerHTML = '<pre><code class="language-' + content.value.language + '">' + content.value.code + '</code></pre>';
        sec.classList.add("code");
    } else if (content.type == "image") {
        sec.innerHTML = '<img src="' + content.value.src + '" alt="' + content.value.alt + '">';
        sec.classList.add("image");
    } else if (content.type == "header") {
        sec.innerHTML = '<h2>' + content.value + '</h2>';
    } else if (content.type == "subheader") {
        sec.innerHTML = '<h3>' + content.value + '</h3>';
    }
    document.querySelector("#content").appendChild(sec);
});

var toc = document.querySelector("#tableOfContent").querySelector("ul");

document.querySelector("#content").querySelectorAll("h2,h3").forEach(function(tag){
    var wrapper = document.createElement("a");
    var wrapped = document.createElement(tag.tagName);
    wrapped.innerHTML = tag.innerHTML;
    wrapper.classList.add("toc-item");
    wrapper.name = tag.innerHTML.replace(/ /g, "_");
    wrapper.appendChild(wrapped);
    tag.replaceWith(wrapper);

    var li = document.createElement("li");
    var href_elem = document.createElement("a");
    li.innerHTML = tag.innerHTML;
    li.classList.add(tag.tagName.toLowerCase());
    href_elem.appendChild(li);
    href_elem.href = "#" + wrapper.name;
    if (tag.tagName.toLowerCase() == "h2") {
        toc.appendChild(href_elem);
    } else if (tag.tagName.toLowerCase() == "h3") {
        if (!toc.lastChild.classList.contains("subhead-set")) {
            var subhead_set = document.createElement("ul");
            subhead_set.classList.add("subhead-set");
            toc.appendChild(subhead_set);
        }
        toc.lastChild.appendChild(href_elem);
    }
});

document.body.addEventListener("scroll", function(){
    var target;
    document.querySelector("#content").querySelectorAll("h2,h3").forEach(function(item){
        if (item.getBoundingClientRect().bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
            target = item;
        }
    });
    target.classList.add("active");
    document.querySelector("#tableOfContent").querySelectorAll("a li.active").forEach(function(elem){
        elem.classList.remove("active");
    });
    document.querySelector("#tableOfContent").querySelector("a[href='#" + target.innerHTML.replace(/ /g, "_") + "'] li").classList.add("active");
});

hljs.highlightAll();