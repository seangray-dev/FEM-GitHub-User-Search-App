// get DOM elements
const themeToggle = document.querySelector(".theme-toggle");
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const errorText = document.querySelector(".text-error");
const profileImage = document.querySelector(".profileImage");
const profileName = document.querySelector(".profileName");
const profileUserName = document.querySelector(".profileUserName");
const userJoinedDate = document.querySelector(".userJoinedDate");
const profileAbout = document.querySelector(".profileAbout");
const profileRepos = document.querySelector(".profileRepos");
const profileFollowers = document.querySelector(".profileFollowers");
const profileFollowing = document.querySelector(".profileFollowing");
const userLocation = document.querySelector(".userLocation");
const userWebsite = document.querySelector(".userWebsite");
const userTwitter = document.querySelector(".userTwitter");
const userOrganizations = document.querySelector(".userOrganizations");
const notAvailableElements = document.querySelectorAll(".not-available");



// helper function to toggle elements that are not available
const toggleNotAvailable = function (element, value) {
  element.classList.toggle("hidden", value !== null);
  element.parentElement.classList.toggle("inactive", value === null);
};

// add event listener for each search
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get username from search input
  const username = searchInput.value.trim();

  try {
    // fetch user data from GH API
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    // throw error if repsonse isnt successful
    if (!response.ok) {
      throw new Error("User not found");
    }

    // parse user data from response
    const {
      avatar_url,
      name,
      login,
      created_at,
      bio,
      public_repos,
      followers,
      following,
      location,
      html_url,
      twitter_username,
      company,
    } = await response.json();

    // update DOM with user data
    errorText.classList.add("hidden");
    profileImage.src = avatar_url;
    profileName.textContent = name;
    profileUserName.innerHTML = `<a href="${html_url}" target="_blank">${login}</a>`;
    const joinDate = new Date(created_at);
    userJoinedDate.textContent = joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    profileAbout.textContent = bio || "This user has no bio.";
    profileRepos.textContent = public_repos;
    profileFollowers.textContent = followers;
    profileFollowing.textContent = following;
    userLocation.textContent = location || "Not available";
    toggleNotAvailable(notAvailableElements[0], location);

    userWebsite.href = html_url || "";
    userWebsite.textContent =
      userWebsite.href !== "" ? userWebsite.href : "Not available";
    toggleNotAvailable(notAvailableElements[1], userWebsite.href);

    userTwitter.innerHTML = twitter_username
      ? `@${twitter_username}`
      : "Not available";
    toggleNotAvailable(notAvailableElements[2], twitter_username);

    userOrganizations.textContent = company || "Not available";
    toggleNotAvailable(notAvailableElements[3], company);
  } catch (error) {
    console.error(error);
    errorText.classList.remove("hidden");
    // add inactive class to corresponding elements that do not return data
    notAvailableElements.forEach((element) => {
      toggleNotAvailable(element, null);
    });
  }
});
