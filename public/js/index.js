const body = document.querySelector("body"),
  modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}
let getStatus = localStorage.getItem("mode");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});
const subMenu = document.getElementById("subMenu");
function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}
window.onclick = (event) => {
  if (!event.target.matches(".btn")) {
    if (subMenu.classList.contains("open-menu")) {
      subMenu.classList.remove("open-menu");
    }
  }
};
subMenu.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
});
const table = document.querySelector("table");
const rows = Array.from(table.querySelectorAll("tr"));
table.querySelectorAll("th").forEach(function (header, index) {
  header.addEventListener("click", function () {
    rows.sort(function (a, b) {
      const aValue = a.querySelectorAll("td")[index].textContent;
      const bValue = b.querySelectorAll("td")[index].textContent;
      return aValue.localeCompare(bValue);
    });
    rows.forEach(function (row) {
      table.querySelector("tbody").appendChild(row);
    });
  });
});
function filter_list(lst, condition) {
  return lst.filter(condition);
}

fetch("./public/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const filteredData = filter_list(data, (item) => {
      return item.tabaqasi === "A";
    });
    const html = filteredData
      .map(
        (item) => `
       <tr>
        <th>${item.id}</th>
        <th>${item.first_name}</th>
        <th>${item.last_name}</th>
        <th>${item.email}</th>
        <th>${item.tabaqasi}</th>
       </tr>`
      )
      .join("");
    document.getElementById("myList").innerHTML = html;
  })
  .catch((error) => {
    console.log("Error:", error);
  });
