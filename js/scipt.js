function loadHTML(id, url) {
  fetch(url)
    .then(resp => resp.text())
    .then(html => document.getElementById(id).innerHTML = html);
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html");
  loadHTML("footer", "footer.html");
});
