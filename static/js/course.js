import { db, doc, getDoc, collection, getDocs } from "/js/firebase-config.js";
const GET_attributes = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const id = GET_attributes.id;
let section_index = parseInt(GET_attributes.section);

if(isNaN(section_index)){
    section_index = 0;
}

const course = doc(db, "Courses", id);
var course_name;
var course_description;

await getDoc(course).then((course) => {
    course_name = course.data().name;
    course_description = course.data().description;
});

await getDocs(collection(course,"sections")).then((querySnapshot) => {
    querySnapshot.docs.forEach((section,index) => {
        section = section.data();
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
    var section = querySnapshot.docs[section_index].data();
    document.title = course_name + ": " + section.name;
    document.querySelector('meta[name="description"]').setAttribute("content", course_description);
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
    var toc_elements = document.querySelector("#content").querySelectorAll("h2,h3")
    toc_elements.forEach(function(tag){
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
        var item_label;
        if (manual_scroll) {
            (Array.from(toc_elements)).find((item_)=>{
                item_label = toc_elements[(Array.from(toc_elements)).indexOf(item_)].innerHTML;
                var item = document.getElementsByName(item_label.replace(/ /g, "_"))[0];
                return item.getBoundingClientRect().bottom <= (window.innerHeight || document.documentElement.clientHeight) && (item.getBoundingClientRect().top > 0)
            });
            document.querySelector("#tableOfContent").querySelectorAll("a li.active").forEach(function(elem){
                elem.classList.remove("active");
            });
            document.querySelector("#tableOfContent").querySelector("a[href='#" + item_label.replace(/ /g, "_") + "'] li").classList.add("active");
            manual_scroll = false;
        }
    });
    
    document.querySelectorAll("#tableOfContent ul a").forEach((label) => {
        label.addEventListener("click", function(event){
            document.querySelector("#tableOfContent").querySelectorAll("a li.active").forEach(function(elem){
                elem.classList.remove("active");
            });
            event.target.classList.add("active");
        });
    });

    let manual_scroll = false;

    document.body.addEventListener("wheel", function(){
        manual_scroll = true;
    });

    document.body.addEventListener("touchmove", function(){
        manual_scroll = true;
    });

    hljs.highlightAll();
});