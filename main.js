const usersListElement = document.querySelector(".users-list");
const userInfo = document.querySelector('.user-info')
const apiUrl = "https://jsonplaceholder.typicode.com";


usersListElement.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.dataset.userId){
        getUserInfoHTTP(e.target.dataset.userId, onGetUserInfoCallback)
    }
})
function getUsersHTTP(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/users`);
  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      return;
    }
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
  xhr.send();
}

function getUserInfoHTTP(id, cb){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/users/${id}`);
    xhr.addEventListener("load", () => {
      if (xhr.status !== 200) {
        return;
      }
      const response = JSON.parse(xhr.responseText);
      cb(response);
    });
    xhr.send();
}

function onGetUserInfoCallback(user){
    if(!user.id){
        return
    }
    renderUserInfo(user)
}
function renderUserInfo(user){
    userInfo.innerHTML = ''
    const template = userInfoTemplate(user)
    userInfo.insertAdjacentHTML('afterbegin', template)
}

function onGetUsersCallBack(users) {
  if (!users.length) {
    return;
  }
  renderUsersList(users);
}


function renderUsersList(users) {
  const fragment = users.reduce((acc, user) => 
    acc + userListItemTemplate(user), "");
    usersListElement.insertAdjacentHTML("afterbegin", fragment);
}

function userListItemTemplate(user) {
  return `
        <button type="button" class="list-group-item list-group-item-action" data-user-id="${user.id}">
            ${user.name}
        </button>
    `;
}
function userInfoTemplate(user){
    return `
        <div class="card border-primary mb-3">
            <div class="card-header">${user.name}</div>
            <div class="card-body text-primary">
                <h5 class="card-title">${user.email} </h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Nickname: </b>${user.username}</li>
                    <li class="list-group-item"><b>Website: </b>${user.website}</li>
                    <li class="list-group-item"><b>Company: </b>${user.company.name}</li>
                    <li class="list-group-item"><b>City: </b>${user.address.city}</li>
                </ul>
            </div>
            <div class="card-footer bg-transparent border-success">Phone: ${user.phone}</div>
        </div>
    `
}
getUsersHTTP(onGetUsersCallBack);

