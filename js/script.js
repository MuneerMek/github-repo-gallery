// the .overview div element, shows my profile's contents
const overview = document.querySelector(".overview");
// My github username
const username = "MuneerMek";
// Unordered list of repositories
const repoList = document.querySelector(".repo-list");
// Section that contains repos and their information
const repoLib = document.querySelector(".repos");
// Individual repo data display section
const repoData = document.querySelector(".repo-data");
// Back to repo gallery button
const returnButton = document.querySelector(".view-repos");
// Responsive repo searchbar
const filterInput = document.querySelector(".filter-repos");

const userInfoFetch = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  userInfoDisplay(data);
};

const userInfoDisplay = async function (data) {
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
  gitRepoFetch();
};

const gitRepoFetch = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const data = await res.json();
  gitRepoNames(data);
};

const gitRepoNames = async function (repos) {
  filterInput.classList.remove("hide");
  for (let repo of repos) {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    li.classList.add("repo");
    repoList.append(li);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    gitRepoInfo(repoName);
  }
});

const gitRepoInfo = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await res.json();
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  const languages = [];
  for (let lan in languageData) {
    languages.push(lan);
  }
  repoInfoDisplay(repoInfo, languages);
};

const repoInfoDisplay = function (repoInfo, languages) {
  repoData.innerHTML = ``;
  const repoInfoDiv = document.createElement("div");
  repoInfoDiv.innerHTML = `
<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(repoInfoDiv);
  repoData.classList.remove("hide");
  repoLib.classList.add("hide");
  returnButton.classList.remove("hide");
};

returnButton.addEventListener("click", function () {
  repoData.classList.add("hide");
  repoLib.classList.remove("hide");
  returnButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const input = filterInput.value.toLowerCase();
  const repos = document.querySelectorAll(".repo");
  for (let repo of repos) {
    const searchResult = repo.innerText.toLowerCase();
    if (searchResult.includes(input)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});

userInfoFetch();
