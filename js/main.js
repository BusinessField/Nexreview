// <-- Handle Header Search -->
let headerSearchInp = document.querySelector(".header-search-inp");
let headerSearchBtn = document.querySelector(".header-search-btn");

headerSearchBtn.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.add("active");
    headerSearchInp.classList.add("active");
    if (headerSearchInp.value !== "") {
        getHeaderSearchPosts();
        headerSearchInp.value = "";
        !headerSearchInp.blur();
    }

    if (this.classList.contains("active")) {
        document.addEventListener("click", (e) => {
            if (e.target !== headerSearchBtn && e.target !== headerSearchInp) {
                this.classList.remove("active");
                headerSearchInp.classList.remove("active");
            }
        });
    }
};

function getHeaderSearchPosts() {
    let searchValue = headerSearchInp.value.toLowerCase();

    fetch("json/posts.json")
    .then((result) => result.json())
    .then((posts) => {
        let pickedPosts = [];

        for (let i = 0; i < posts.length; i++) {
            let currentPost = posts[i];
            let currentPostKeywords = currentPost.keywords;
            for (let j = 0; j < currentPostKeywords.length; j++) {
                if (currentPostKeywords[j].includes(searchValue)) {
                    pickedPosts.push(currentPost);
                }
            }
        }
        return pickedPosts;
    })
    .then((pickedPosts) => {
        if (pickedPosts.length > 0) {
            
            // <-- Set Search Result Pop up -->
            // Create Elements
            let searchPopup = document.createElement("div");
            let searchContainer = document.createElement("div");

            let searchHead = document.createElement("div");
            let searchHeadTitle = document.createElement("h2");
            let searchWord = document.createElement("span");
            let searchClose = document.createElement("button");

            let searchResultsHolder = document.createElement("div");

            // Set Classes and InnerHTML
            searchPopup.className = "search-popup";
            searchContainer.className = "search-container p-3 p-md-4";

            searchHead.className = "search-head px-2";
            searchHeadTitle.className = "fs-4";
            searchWord.className = "search-word";
            searchClose.className = "search-close-btn btn fs-4 px-0";
            searchHeadTitle.innerHTML = `${pickedPosts.length === 1 ? "Result" : "Results"} Related to: `;
            searchWord.innerHTML = searchValue;
            searchClose.innerHTML = `<i class="fa fa-close"></i>`;

            searchResultsHolder.className = "search-result px-3 py-4";

            // Get Posts Titles and Links
            for (let i = 0; i < pickedPosts.length; i++) {
                let resultBox = document.createElement("a");
                let resultTitle = document.createElement("h3");
                resultBox.className = "result-box d-block p-3";
                resultTitle.className = "post-title fs-5 m-0";

                resultBox.href = pickedPosts[i].postLink;
                resultTitle.innerHTML = pickedPosts[i].title;

                resultBox.appendChild(resultTitle);
                searchResultsHolder.appendChild(resultBox);
            }

            // Append Elements
            searchHeadTitle.appendChild(searchWord)

            searchHead.appendChild(searchHeadTitle);
            searchHead.appendChild(searchClose);

            searchContainer.appendChild(searchHead);
            searchContainer.appendChild(searchResultsHolder);

            searchPopup.appendChild(searchContainer);

            document.body.appendChild(searchPopup);

            // Clicking on Close Button
            searchClose.addEventListener("click", (e) => {
                e.stopPropagation();
                searchPopup.style.transition = "0.3s";
                searchPopup.style.scale = "0";
                setTimeout(() => {
                    searchPopup.remove();
                }, 300)
            })
        } else {
            // If There is no Posts
        }
    })
}


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