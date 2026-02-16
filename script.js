const form = document.getElementById("profileForm");
const preview = document.getElementById("profilePreview");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    clearErrors();
    let isValid = true;

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const phone = document.getElementById("phone");
    const website = document.getElementById("website");
    const gender = document.getElementById("gender");
    const imageInput = document.getElementById("image");

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (username.value.trim() === "") {
        showError(username, "Username required");
        isValid = false;
    }

    if (!emailPattern.test(email.value)) {
        showError(email, "Enter valid email");
        isValid = false;
    }

    if (password.value.length < 6) {
        showError(password, "Minimum 6 characters");
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    if (!phonePattern.test(phone.value)) {
        showError(phone, "Enter valid 10-digit phone");
        isValid = false;
    }

    if (gender.value === "") {
        showError(gender, "Select gender");
        isValid = false;
    }

    if (!isValid) return;

    preview.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card");

    let imageURL = imageInput.files[0] 
        ? URL.createObjectURL(imageInput.files[0]) 
        : "https://via.placeholder.com/120";

    card.innerHTML = `
        <img src="${imageURL}">
        <h3>${username.value}</h3>
        <p>${email.value}</p>
        <p>${phone.value}</p>
        <p>Gender: ${gender.value}</p>
        ${website.value ? `<button onclick="window.open('${website.value}', '_blank')">Visit Website</button>` : ""}
    `;

    preview.appendChild(card);
    form.reset();
});

function showError(input, message) {
    input.nextElementSibling.innerText = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
}
