// <-- Set Staff Picks Sosts -->
let staffTitles = document.querySelectorAll(".staff-picks .post-title");
let staffCategories = document.querySelectorAll(".staff-picks .post-category");

setStaffPosts();

// <-- Set Main Home Page Post -->
let mainPost = document.querySelector("#main-post-link");
let mainPostImage = document.querySelector(".main-post-box img");
let mainPostTitle = document.querySelector(".main-post-box .post-title");
let mainPostCategory = document.querySelector(".main-post-box .post-category");

setMainPost();

// <-- Set Home Page Posts -->
let homePosts = document.querySelectorAll(".post-box");
let homePostsImages = document.querySelectorAll(".post-box img");
let homePostsTitles = document.querySelectorAll(".post-box .post-title");
let homePostsCategories = document.querySelectorAll(".post-box .post-category");

setHomePosts();

// <-- Start Functions -->

function setStaffPosts() {
    fetch("./json/staff-picks-posts.json")
    .then((result) => result.json())
    .then((posts) => {
        if (posts.length > 0) {
            for (let i = 0; i < staffTitles.length; i++) {
                staffTitles[i].parentElement.href = posts[i].postLink;
                staffTitles[i].innerHTML = posts[i].title;
                staffCategories[i].innerHTML = posts[i].category;
            }
        } else {
            document.querySelector(".staff-picks .staff-boxes").innerHTML = "More Posts Comming Soon";
        }
    })
    .catch(() => document.querySelector(".staff-picks .staff-boxes").innerHTML = "More Posts Comming Soon");
}

function setMainPost() {
    fetch("./json/home-page-posts.json")
    .then((result) => result.json())
    .then((posts) => {
        if (posts.length > 0) {
            mainPost.href = posts[0].postLink;
            mainPostImage.src = posts[0].image;
            mainPostImage.alt = posts[0].title;
            mainPostTitle.innerHTML = posts[0].title;
            mainPostCategory.innerHTML = posts[0].category;
        } else {
            document.querySelector("main-post-box").innerHTML = "Something Went Wrong, Try Reloading The Page";
        }
    })
    .catch(() => document.querySelector(".main-post-box").innerHTML = "Something Went Wrong, Try Reloading The Page");
}

function setHomePosts() {
    fetch("./json/home-page-posts.json")
    .then((result) => result.json())
    .then((posts) => {
        if (posts.length > 0) {
            for (let i = 0; i < homePosts.length; i++) {
                homePosts[i].href = posts[i + 1].postLink;
                homePostsImages[i].src = posts[i + 1].image;
                homePostsImages[i].alt = posts[i + 1].title;
                homePostsTitles[i].innerHTML = posts[i + 1].title;
                homePostsCategories[i].innerHTML = posts[i + 1].category;
            }
        } else {
            // document.querySelector(".staff-picks .staff-boxes").innerHTML = "More Posts Comming Soon";
        }
    })
    // .catch(() => document.querySelector(".staff-picks .staff-boxes").innerHTML = "More Posts Comming Soon");
}