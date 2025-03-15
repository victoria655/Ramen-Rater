const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "images/shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "images/kojiro.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "images/gyukotsu.jpg" }
 ];
  
// a function that automatically loads images in the ramen-menu div immediately the html content loads on the webpage
 function displayRamens() {
    const ramenMenu = document.querySelector(".ramen-menu");
    
    ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.style.cursor = "pointer";
        
        ramenMenu.appendChild(img);
    });
}

document.addEventListener("DOMContentLoaded", displayRamens);

function handleClick(event) {
    // Get the clicked image element
    const image = event.target;

    // Find the corresponding ramen object
    const ramen = ramens.find(r => image.src.includes(r.image));

    if (ramen) {
        // Select the image display div
        const display = document.querySelector(".image");
       
        // Clear the existing content
        display.innerHTML = "";

        // Create a new image element and set its attributes
        const ramenImg = document.createElement("img");
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.style.width = "200px"; // Ensures it fits the div
        ramenImg.style.height = "200px";
        // Create details section
        const details = document.querySelector(".details");
        details.innerHTML = `
            <h2>${ramen.name}</h2>
            <h3>${ramen.restaurant}</h3>
            <p><strong>Rating:</strong> ${ramen.rating || "No rating available"}</p>
            <p><strong>Comment:</strong> ${ramen.comment || "No comments available"}</p>
        `;

        // Append the image and details to the display div
        display.appendChild(ramenImg);
       
    }
}

  function displayRamens() {
    const ramenMenu = document.querySelector(".ramen-menu");
    ramenMenu.innerHTML = ""; // Clear any existing content

    ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.style.cursor = "pointer";

        img.addEventListener("click", () => displayRamenDetails(ramen));

        ramenMenu.appendChild(img);
    });
}

// Function to display ramen details when clicked
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
        <p><strong>Rating:</strong> ${ramen.rating || "No rating available"}</p>
        <p><strong>Comment:</strong> ${ramen.comment || "No comments available"}</p>
    `;

    display.appendChild(ramenImg);
}

// Function to add event listener for form submission
function addSubmitListener() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload

        // Get input values
        const name = document.getElementById("name").value;
        const restaurant = document.getElementById("restaurant").value;
        const image = document.getElementById("images").value;
        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("review").value;

        // Create a new ramen object
        const newRamen = {
            id: ramens.length + 1,
            name,
            restaurant,
            image,
            rating: rating || "No rating available",
            comment: comment || "No comments available"
        };

        // Add new ramen to the ramens array
        ramens.push(newRamen);

        // Add the new ramen image to ramen-menu
        const ramenMenu = document.querySelector(".ramen-menu");
        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.style.cursor = "pointer";

        img.addEventListener("click", () => displayRamenDetails(newRamen));

        ramenMenu.appendChild(img);

        // Reset the form
        form.reset();
        alert("Review added successfully!");
    });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    displayRamens();
    addSubmitListener();
});

