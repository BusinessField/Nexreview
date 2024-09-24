let searchInput=document.querySelector(".blog-search .blog-search-inp"),searchResultBox=document.querySelector(".search-result"),filter=(searchInput.addEventListener("input",()=>{""!==searchInput.value?handleBlogSearch():searchResultBox.innerHTML=""}),document.querySelector(".filter")),bulletsHolder=document.querySelector(".bullets"),bullets=document.querySelectorAll(".bullets li button"),postsHolder=document.querySelector(".posts-holder"),postsCategory="all";function handleBlogSearch(){fetch("json/posts.json").then(e=>e.json()).then(t=>{if(0<t.length){searchResultBox.innerHTML="";var l,s=searchInput.value.toLowerCase(),o=[];for(let e=0;e<t.length&&(l=t[e],4!==o.length);e++)for(let e=0;e<l.keywords.length;e++)if(l.keywords[e].toLowerCase().includes(s)){o.push(l);break}o.forEach(e=>{var t=document.createElement("li"),l=document.createElement("a");l.className="d-block ps-3 py-3",l.href=e.postLink,l.appendChild(document.createTextNode(e.title)),t.appendChild(l),searchResultBox.appendChild(t)})}})}function getBlogPosts(o){fetch("json/posts.json").then(e=>e.json()).then(t=>{var l=[];for(let e=0;e<t.length;e++){var s=t[e].category.toLowerCase();("all"===o||s===o)&&l.push(t[e])}return l}).then(t=>{if(postsHolder.innerHTML="",0<t.length)for(let e=0;e<t.length;e++){var l=document.createElement("div"),s=document.createElement("a"),o=document.createElement("img"),a=document.createElement("span"),n=document.createElement("h3");l.className="col-md-6 col-lg-4",s.className="post-box d-block mx-auto mx-md-0 p-2",o.className="w-100",a.className="post-category d-block mt-3 mb-1 ps-1 text-uppercase",n.className="post-title fs-5 ps-1 mb-0",s.href=t[e].postLink,o.src=t[e].image,o.alt=t[e].title,a.innerHTML=t[e].category,n.innerHTML=t[e].title,s.appendChild(o),s.appendChild(a),s.appendChild(n),l.appendChild(s),postsHolder.appendChild(l)}}).catch(()=>setErrorPost(postsHolder))}function removeClass(e,t){e.classList.remove(String(t))}function setErrorPost(e){e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.minHeight="230px",e.innerHTML="";var t=document.createElement("div"),l=(t.className="error-post",document.createElement("div")),s=document.createElement("i"),o=document.createElement("h4"),s=(l.className="error-info",s.className="fa-solid fa-triangle-exclamation fa-4x error-icon",o.innerHTML="Something went wrong!",l.appendChild(s),l.appendChild(o),document.createElement("div")),o=document.createElement("p"),a=document.createElement("button");s.className="reload-page",o.innerHTML="Check out the network and reload the page :",a.className="main-btn",a.innerHTML="Reload",a.onclick=function(){window.location.reload()},s.appendChild(o),s.appendChild(a),t.appendChild(l),t.appendChild(s),e.appendChild(t)}getBlogPosts(postsCategory),bullets.forEach(e=>{e.addEventListener("click",e=>{bullets.forEach(e=>{removeClass(e,"active"),removeClass(e.parentElement,"active"),bulletsHolder.classList.contains("show")&&removeClass(bulletsHolder,"show"),filter.classList.contains("active")&&removeClass(filter,"active")}),e.target.classList.add("active"),e.target.parentElement.classList.add("active"),getBlogPosts(postsCategory=e.target.dataset.category.toLowerCase())})}),filter.onclick=function(){this.classList.toggle("active"),bulletsHolder.classList.toggle("show")};