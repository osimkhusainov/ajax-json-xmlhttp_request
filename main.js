const btn = document.querySelector("button");
const container = document.querySelector(".container");
const usersInfo = document.querySelector(".users-info");
let local;
function toLocal() {
  local = container.innerHTML;
  localStorage.setItem("todo", local);
}
if (localStorage.getItem("todo")) {
  container.innerHTML = localStorage.getItem("todo");
}
function getUsers(cd) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cd(response);
  });
  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send();
}
function createUsersList(response) {
  const fragment = document.createDocumentFragment();
  response.forEach((users) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset == users.id
    card.textContent = users.name;
    const cardName = document.createElement("p");
    cardName.classList.add("card-text");

    card.appendChild(cardName);
    fragment.appendChild(card);

  });
  container.appendChild(fragment);
  toLocal();
}
function infoUsers(response){
    const fragment = document.createDocumentFragment();
    response.forEach((users) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const userName = document.createElement("div");
      userName.classList.add("card-title");
      userName.textContent = users.username
      const email = document.createElement("a");
      email.classList.add('card-text')
      email.textContent = users.email
      const address = document.createElement('div')
      address.classList.add('card-body')
      const street = document.createElement('p')
      street.classList.add('card-text')
      street.textContent = users.address.street
      address.appendChild(street)
      card.appendChild(userName)
      card.appendChild(email)
      card.appendChild(address)
      fragment.appendChild(card)
    });
    usersInfo.appendChild(fragment)
}
btn.addEventListener("click", (e) => {
  getUsers(createUsersList);
});
container.addEventListener("click", ({ target }) => {
  if (target.classList.contains("card")) {
    target.closest(getUsers(infoUsers));
  }
});
