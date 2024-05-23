document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const path = window.location.pathname;

    if (path.endsWith("index.html")) {
        loadPosts();
    } else if (path.endsWith("post.html")) {
        document.getElementById("postForm").addEventListener("submit", (event) => {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const postContent = document.getElementById("postContent").value;
            savePost(title, postContent);
        });
    } else if (path.endsWith("profile.html")) {
        loadProfile();
    } else if (path.endsWith("profile_edit.html")) {
        document.getElementById("profileForm").addEventListener("submit", (event) => {
            event.preventDefault();
            saveProfile();
        });
        loadProfileEdit();
    }
});

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Home</h2><p>Welcome to Celestial Chronicle, where stars align and thoughts take flight. I hope you're having a luminous day amidst the cosmic tapestry.</p>";
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <div class="profile-img">
                <img src="${getProfilePicture()}" alt="Profile Picture">
            </div>
            <div>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </div>
        `;
        content.appendChild(postElement);
    });
}

function savePost(title, postContent) {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.push({ title, content: postContent });
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Post saved!");
    window.location.href = "index.html";
}

function saveProfile() {
    const profilePicture = document.getElementById("profilePicture").files[0];
    const name = document.getElementById("name").value;
    const pronouns = document.getElementById("pronouns").value;
    const birthday = document.getElementById("birthday").value;
    const age = document.getElementById("age").value;
    const favoriteSong = document.getElementById("favoriteSong").value;
    const favoriteColor = document.getElementById("favoriteColor").value;
    const description = document.getElementById("description").value;

    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profile = {
                profilePicture: e.target.result,
                name,
                pronouns,
                birthday,
                age,
                favoriteSong,
                favoriteColor,
                description
            };
            localStorage.setItem("profile", JSON.stringify(profile));
            window.location.href = "profile.html";
        };
        reader.readAsDataURL(profilePicture);
    } else {
        const profile = {
            profilePicture: getProfilePicture(),
            name,
            pronouns,
            birthday,
            age,
            favoriteSong,
            favoriteColor,
            description
        };
        localStorage.setItem("profile", JSON.stringify(profile));
        window.location.href = "profile.html";
    }
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
        document.getElementById("displayName").textContent = `Name: ${profile.name}`;
        document.getElementById("displayPronouns").textContent = `Pronouns: ${profile.pronouns}`;
        document.getElementById("displayBirthday").textContent = `Birthday: ${profile.birthday}`;
        document.getElementById("displayAge").textContent = `Age: ${profile.age}`;
        document.getElementById("displayFavoriteSong").textContent = `Favorite Song: ${profile.favoriteSong}`;
        document.getElementById("displayFavoriteColor").textContent = `Favorite Color: ${profile.favoriteColor}`;
        document.getElementById("displayDescription").textContent = `Description: ${profile.description}`;

        const imgContainer = document.createElement("div");
        imgContainer.className = "profile-img";
        const img = document.createElement("img");
        img.src = profile.profilePicture;
        img.alt = "Profile Picture";
        imgContainer.appendChild(img);
        document.getElementById("profileDisplay").prepend(imgContainer);
    }
}

function loadProfileEdit() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
        document.getElementById("name").value = profile.name;
        document.getElementById("pronouns").value = profile.pronouns;
        document.getElementById("birthday").value = profile.birthday;
        document.getElementById("age").value = profile.age;
        document.getElementById("favoriteSong").value = profile.favoriteSong;
        document.getElementById("favoriteColor").value = profile.favoriteColor;
        document.getElementById("description").value = profile.description;
    }
}

function getProfilePicture() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    return profile ? profile.profilePicture : '';
}
