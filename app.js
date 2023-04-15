const urlList = document.getElementById("url-list");
const addForm = document.getElementById("add-form");
const urlInput = document.getElementById("url-input");

let urls = JSON.parse(localStorage.getItem("urls")) || [];

// render URL list
function renderList() {
  urlList.innerHTML = "";
  urls.forEach((url, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const button = document.createElement("button");

    a.href = url;
    a.target = "_blank";
    a.textContent = `${index + 1}. ${url}`;
    button.textContent = "削除";
    button.addEventListener("click", () => {
      urls.splice(index, 1);
      localStorage.setItem("urls", JSON.stringify(urls));
      renderList();
    });

    li.appendChild(a);
    li.appendChild(button);
    urlList.appendChild(li);
  });
}

// add URL to list
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  urls.push(urlInput.value);
  localStorage.setItem("urls", JSON.stringify(urls));urlInput.value = "";
renderList();
});

// delete URLs older than 1 week
setInterval(() => {
const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
urls = urls.filter((url) => {
const addedDate = new Date(url.added);
return addedDate > oneWeekAgo;
});
localStorage.setItem("urls", JSON.stringify(urls));
renderList();
}, 24 * 60 * 60 * 1000);

renderList();
 
