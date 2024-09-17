// <-- Handle Blog Search -->

let searchInput = document.querySelector(".blog-search .blog-search-inp");
let searchResultBox = document.querySelector(".search-result");

searchInput.addEventListener("input", () => {
    if (searchInput.value !== "") {
        handleBlogSearch();
    } else {
        searchResultBox.innerHTML = "";
    }
});



// <-- Set Posts -->

let filter = document.querySelector(".filter");
let bulletsHolder = document.querySelector(".bullets");
let bullets = document.querySelectorAll(".bullets li button");
let postsHolder = document.querySelector(".posts-holder");
let postsCategory = "all";

getBlogPosts(postsCategory);

// Control Posts Category + Remove & Add Active Class
bullets.forEach((button) => {
    button.addEventListener("click", (e) => {
        bullets.forEach((btn) => {
            removeClass(btn, "active");
            removeClass(btn.parentElement, "active");
            bulletsHolder.classList.contains("show") ? removeClass(bulletsHolder, "show") : false;
            filter.classList.contains("active") ? removeClass(filter, "active") : false;
        });
        e.target.classList.add("active");
        e.target.parentElement.classList.add("active");

        postsCategory = e.target.dataset.category.toLowerCase();
        getBlogPosts(postsCategory);
    });
});

// Handle Clicking on Filter Button
filter.onclick = function () {
    this.classList.toggle("active");
    bulletsHolder.classList.toggle("show");
}

// <-- Start Functions -->

// Handle Blog Search Function
function handleBlogSearch() {
    fetch("json/posts.json")
    .then((result) => result.json())
    .then((posts) => {
        if (posts.length > 0) {
            searchResultBox.innerHTML = "";

            let searchValue = searchInput.value.toLowerCase();
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
                        pickedPosts.push(currentPost);
                        break;
                    }
                }
            }
            // Creating Search Result
            pickedPosts.forEach((post) => {
                let li = document.createElement("li");
                let a = document.createElement("a");

                a.className = "d-block ps-3 py-3";
                a.href = post.postLink;
                a.appendChild(document.createTextNode(post.title));

                li.appendChild(a);
                searchResultBox.appendChild(li);
            });
        } else {
            // If There is no Posts
        }
    });
}

// Get Blog Posts Function
function getBlogPosts(category) {
    fetch("json/posts.json")
    .then((result) => result.json())
    .then((posts) => {
        let filtredPosts = [];
        for (let i = 0; i < posts.length; i++) {
            let currentPostCategory = posts[i].category.toLowerCase();
            if (category === "all") {
                filtredPosts.push(posts[i]);
            } else if (currentPostCategory === category) {
                filtredPosts.push(posts[i]);
            }
        }
        return filtredPosts;
    })
    .then((filtredPosts) => {
        // Set Posts in The Page
        postsHolder.innerHTML = "";
        if (filtredPosts.length > 0) {
            for (let i = 0; i < filtredPosts.length; i++) {
                let gridDiv = document.createElement("div");
                let postBox = document.createElement("a");
                let postImg = document.createElement("img");
                let postCategory = document.createElement("span");
                let postTitle = document.createElement("h3");
    
                gridDiv.className = "col-md-6 col-lg-4";
                postBox.className = "post-box d-block mx-auto mx-md-0 p-2";
                postImg.className = "w-100";
                postCategory.className = "post-category d-block mt-3 mb-1 ps-1 text-uppercase";
                postTitle.className = "post-title fs-5 ps-1 mb-0";
    
                postBox.href = filtredPosts[i].postLink;
                postImg.src = filtredPosts[i].image;
                postImg.alt = filtredPosts[i].title;
                postCategory.innerHTML = filtredPosts[i].category;
                postTitle.innerHTML = filtredPosts[i].title;
    
                postBox.appendChild(postImg);
                postBox.appendChild(postCategory);
                postBox.appendChild(postTitle);
                gridDiv.appendChild(postBox);
                postsHolder.appendChild(gridDiv);
            }
        } else {
            // If There is no Posts
        }
    });
}

// Remove Class Function
function removeClass(el, className) {
    el.classList.remove(String(className));
}