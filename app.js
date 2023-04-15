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
// add click event to list item
li.addEventListener("click", () => {
  // remove clicked url from array
  urls.splice(index, 1);
  // update localStorage
  localStorage.setItem("urls", JSON.stringify(urls));
  // render updated list
  renderList();
});
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

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function showNotification(title, options) {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options);
  }
}
// delete URLs older than 1 week
setInterval(() => {
const oneWeekAgo = new Date(Date.now() - 1*60*1000);
urls = urls.filter((url) => {
  const addedDate = new Date(url.added);
  const isOld = addedDate <= oneWeekAgo;
  if (isOld) {
    const notification = new Notification("リンクが削除されました", {
      body: url.link,
    });
  }
  return !isOld;
});
localStorage.setItem("urls", JSON.stringify(urls));
renderList();
}, 24 * 60 * 60 * 1000);

 renderList();
