/* <-- Toggle Menu --> */
let toggleBtn = document.querySelector(".toggle-btn");
let nav = document.querySelector(".nav-bar");
let navHead = document.querySelector(".nav-bar .head");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    nav.classList.add("show");
};

document.addEventListener("click", (e) => {
    if (e.target != toggleBtn && e.target !== nav && e.target !== navHead) {
        if (nav.classList.contains("show")) {
            nav.classList.remove("show");
        }
    }
});

// <-- Scroll to Top -->
let scrollBtn = document.querySelector(".scroll-to-top");

window.onscroll = function () {
    if (this.scrollY > 300) {
        scrollBtn.style.right = "15px";
    } else {
        scrollBtn.style.right = "-50px";
    }
};

scrollBtn.addEventListener("click", () => {
    this.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// <-- Handle Search -->
let searchInput = document.querySelector(".search");
let searchResultBox = document.querySelector(".search-result");
let searchValue;
let posts = [];

fetch("json/posts.json")
.then((result) => result.json())
.then((result) => {
    for (let post of result) {
        posts.push(post);
    }
});

searchInput.addEventListener("input", () => {
    if (searchInput.value !== "") {
        searchResultBox.innerHTML = "";

        searchValue = searchInput.value.toLowerCase();
        let currentPost;
        let pickedPosts = [];
        
        // Checking The Valid Post
        for (let i = 0; i < posts.length; i++) { 
            currentPost = posts[i];
            if (pickedPosts.length === 4) {
                break;
            }
            for (let j = 0; j < currentPost.keywords.length; j++) {
                let currentPostKeywords = currentPost.keywords[j].toLowerCase();

                if (currentPostKeywords.includes(searchValue)) {
                    // console.log("yes")
                    // console.log(`Search Value: ${searchValue}`)
                    // console.log(`Search Value: ${currentPostKeywords}`)
                    // console.log(`Title: ${currentPost.title}`)
                    pickedPosts.push(currentPost);
                    break;
                }
            }
        }
        console.log(pickedPosts)
        // Creating Search Result
        pickedPosts.forEach((post) => {
            let li = document.createElement("li");
            let a = document.createElement("a");

            a.className = "d-block ps-3 py-3";
            a.href = post.postLink;
            a.appendChild(document.createTextNode(post.title));

            li.appendChild(a);
            searchResultBox.appendChild(li);
        })
    } else {
        searchResultBox.innerHTML = "";
    }
});

function getPosts() {
    fetch("json/posts.json")
    .then((result) => result.json())
    .then((result) => {
        for (let post of result) {
            posts.push(post);
            console.log(posts.length)
        }
    });
}