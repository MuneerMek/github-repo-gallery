// the .overview div element, shows my profile's contents
const overview = document.querySelector(".overview");
// My github username
const username = "MuneerMek";
// Unordered list of repositories
const repoList = document.querySelector(".repo-list");

const gitAPI = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  //   console.log(data);
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
  gitRepos();
};

const gitRepos = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const data = await res.json();
  //   console.log(data);
  //   for (let repo of data) {
  //     console.log(repo);
  //   }
  gitReposInfo(data);
};

const gitReposInfo = async function (repos) {
  for (let repo of repos) {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

gitAPI();
