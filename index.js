const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "images/shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "images/kojiro.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "images/gyukotsu.jpg" }
];

function displayRamens() {
    const ramenMenu = document.querySelector(".ramen-menu");
    ramenMenu.innerHTML = "";

    ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.style.cursor = "pointer";
        img.addEventListener("click", () => displayRamenDetails(ramen));
        ramenMenu.appendChild(img);
    });

    // Display the first ramen automatically on page load
    if (ramens.length > 0) {
        displayRamenDetails(ramens[0]);
    }
}

function displayRamenDetails(ramen) {
    const display = document.querySelector(".image");
    display.innerHTML = "";

    const ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    ramenImg.alt = ramen.name;
    ramenImg.style.width = "200px";
    ramenImg.style.height = "200px";

    const details = document.querySelector(".details");
    details.innerHTML = `
        <h2>${ramen.name}</h2>
        <h3>${ramen.restaurant}</h3>
        <p><strong>Rating:</strong> <span id="rating-display">${ramen.rating || "No rating available"}</span></p>
        <p><strong>Comment:</strong> <span id="comment-display">${ramen.comment || "No comments available"}</span></p>
    `;

    // Editable fields for rating and comment
    const editForm = document.createElement("form");
    editForm.innerHTML = `
        <label for="new-rating">New Rating:</label>
        <input type="number" id="new-rating" min="1" max="5" value="${ramen.rating || ""}">
        <label for="new-comment">New Comment:</label>
        <input type="text" id="new-comment" value="${ramen.comment || ""}">
        <button type="submit">Update</button>
    `;

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newRating = document.getElementById("new-rating").value;
        const newComment = document.getElementById("new-comment").value;

        if (newRating) ramen.rating = newRating;
        if (newComment) ramen.comment = newComment;

        document.getElementById("rating-display").textContent = ramen.rating;
        document.getElementById("comment-display").textContent = ramen.comment;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginTop = "10px";
    deleteBtn.addEventListener("click", () => deleteRamen(ramen));

    details.appendChild(editForm);
    details.appendChild(deleteBtn);
    display.appendChild(ramenImg);
}

function deleteRamen(ramen) {
    const index = ramens.findIndex(r => r.id === ramen.id);
    if (index !== -1) {
        ramens.splice(index, 1);
    }

    displayRamens();
    document.querySelector(".image").innerHTML = "";
    document.querySelector(".details").innerHTML = "";
}

function addSubmitListener() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const restaurant = document.getElementById("restaurant").value;
        const image = document.getElementById("images").value;
        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("review").value;

        const newRamen = {
            id: ramens.length + 1,
            name,
            restaurant,
            image,
            rating: rating || "No rating available",
            comment: comment || "No comments available"
        };

        ramens.push(newRamen);

        const ramenMenu = document.querySelector(".ramen-menu");
        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.style.cursor = "pointer";
        img.addEventListener("click", () => displayRamenDetails(newRamen));
        ramenMenu.appendChild(img);

        form.reset();
        alert("Review added successfully!");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    displayRamens();
    addSubmitListener();
});
