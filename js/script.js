// the .overview div element, shows my profile's contents
const overview = document.querySelector(".overview");
// My github username
const username = "MuneerMek";

const gitAPI = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  console.log(data);
  apiDisplay(data);
};

const apiDisplay = async function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = ` <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
  overview.append(userInfo);
};

gitAPI();
