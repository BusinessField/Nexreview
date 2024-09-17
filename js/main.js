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