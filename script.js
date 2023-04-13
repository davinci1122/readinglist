// Get the form and list elements
const form = document.querySelector('form');
const list = document.getElementById('list');

// Initialize the reading list from localStorage
let readingList = JSON.parse(localStorage.getItem('readingList')) || [];

// Render the reading list
function render() {
  // Clear the existing list items
  list.innerHTML = '';
  // Render a list item for each URL in the reading list
  for (const url of readingList) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url;
    a.textContent = url;
    li.appendChild(a);
    const button = document.createElement('button');
    button.textContent = 'Remove';
    li.appendChild(button);
    list.appendChild(li);
  }
}

// Handle form submission
form.addEventListener('submit', event => {
  event.preventDefault();
  const url = form.url.value.trim();
  if (url !== '') {
    // Add the URL to the reading list and save to localStorage
    readingList.push(url);
    localStorage.setItem('readingList', JSON.stringify(readingList));
    // Reset the form and re-render the reading list
    form.reset();
    render();
  }
});

// Handle list item removal
list.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const url = event.target.previousSibling.href;
    // Remove the URL from the reading list and save to localStorage
    readingList = readingList.filter(item => item !== url);
    localStorage.setItem('readingList', JSON.stringify(readingList));
    // Re-render the reading list
    render();
  }
});

// Move old URLs to the trash
setInterval(() => {
  const now = Date.now();
  readingList = readingList.filter(url => {
    const timestamp = localStorage.getItem(url);
    if (timestamp && now - parseInt(timestamp) > 60) {
      localStorage.removeItem(url);
      return false;
    }
    return true;
  });
  localStorage.setItem('readingList', JSON.stringify(readingList));
  render();
}, 60000);
