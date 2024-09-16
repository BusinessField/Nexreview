// <-- Set Posts -->
let filterButtons = document.querySelectorAll(".bullets button");
let postsHolder = document.querySelector(".posts-holder");
let postsCategory = "all";

getBlogPosts(postsCategory);

// Control Posts Category + Remove & Add Active Class
filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        filterButtons.forEach((btn) => {
            removeActiveClass(btn);
            btn.parentElement.classList.remove("show");
        });
        e.target.classList.add("active");
        e.target.parentElement.classList.add("active");

        postsCategory = e.target.dataset.category.toLowerCase();
        getBlogPosts(postsCategory);
    });
});

document.querySelector(".filter").onclick = function () {
    filterButtons.forEach((btn) => {
        btn.parentElement.classList.toggle("show");
    })
}

// Get Post Function
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
    });
}

// Remove Active Class Function
function removeActiveClass(el) {
    el.classList.remove("active");
}