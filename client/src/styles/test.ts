

// JavaScript Code for Dynamic Features
const cars = [
  {
    model: "Toyota Camry",
    type: "Sedan",
    price: 25000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENy11OwlDkxdwjalVia9uY4HXEBNEfdhMIsaGJZCOEZuKL5Zc",
    description: "Reliable and fuel-efficient sedan.",
  },
  {
    model: "Toyota Supra",
    type: "Sports Car",
    price: 50000,
    image:
      "https://www.buyatoyota.com/sharpr/bat/assets/img/vehicle-info/Supra/2021/supra-hero.png",
    description: "Stylish sports car!",
  },
];

const findCarBtn = document.getElementById("find-car-btn");
const seeAllCarsBtn = document.getElementById("see-all-cars-btn");
const quizContainer = document.getElementById("quiz-container");
const carListContainer = document.getElementById("car-list-container");

seeAllCarsBtn.addEventListener("click", () => {
  carListContainer.classList.toggle("hidden");
  quizContainer.classList.add("hidden");
  displayCars(cars);
});

function displayCars(carList) {
  const carListEl = document.getElementById("car-list");
  carListEl.innerHTML = "";
  carList.forEach((car) => {
    const carItem = document.createElement("div");
    carItem.className = "car-item";
    carItem.innerHTML = `
          <div class="car-image">
              <img src="${car.image}" alt="${car.model}">
          </div>
          <div class="car-details">
              <h3>${car.model}</h3>
              <p>Type: ${car.type}</p>
              <p class="price">$${car.price.toLocaleString()}</p>
              <p>${car.description}</p>
          </div>
      `;
    carListEl.appendChild(carItem);
  });
}

function handleAISearch() {
  const searchInput = document
    .getElementById("ai-search-input")
    .value.toLowerCase();
  const filteredCars = cars.filter(
    (car) =>
      car.model.toLowerCase().includes(searchInput) ||
      car.type.toLowerCase().includes(searchInput) ||
      car.description.toLowerCase().includes(searchInput) ||
      car.price.toString().includes(searchInput)
  );

  displayCars(filteredCars);
}

function sortCarsByPrice() {
  const sortOption = document.getElementById("sort-options").value;
  let sortedCars;

  if (sortOption === "lowest") {
    sortedCars = [...cars].sort((a, b) => a.price - b.price);
  } else if (sortOption === "highest") {
    sortedCars = [...cars].sort((a, b) => b.price - a.price);
  } else {
    sortedCars = cars; // Default to "Featured"
  }

  displayCars(sortedCars);
}
const quizForm = document.getElementById("quiz-form");
const customPrompt = document.getElementById("custom-prompt");

function toggleQuizForm() {
  quizForm.classList.toggle("hidden");
  customPrompt.classList.add("hidden");
  carsContainer.classList.add("hidden");
}

function toggleSearchPrompt() {
  customPrompt.classList.toggle("hidden");
  quizForm.classList.add("hidden");
  carsContainer.classList.add("hidden");
}

function submitQuiz() {
  const model = document.getElementById("model").value;
  const priceRange = document.getElementById("price-range").value;
  const type = document.getElementById("type").value;
  const personality = document.getElementById("personality").value;
  const mpg = document.getElementById("mpg").value;
  const seats = document.getElementById("seats").value;
  const fuelType = document.getElementById("fuel-type").value;
  const horsepower = document.getElementById("horsepower").value;
  const interior = document.getElementById("interior").value;
  const drivetrain = document.getElementById("drivetrain").value;

  alert(
    `Quiz Submitted!\nModel: ${model}, Price: ${priceRange}, Type: ${type}`
  );
}

function submitPrompt() {
  const prompt = document.getElementById("ai-prompt").value;
  alert(`Searching with prompt: ${prompt}`);
}

findCarBtn.addEventListener("click", () => {
  quizContainer.classList.toggle("hidden");
  carListContainer.classList.add("hidden");
  console.log("clicked");
});

// seeAllCarsBtn.addEventListener('click', () => {
//     carsContainer.classList.toggle('hidden');
//     quizContainer.classList.add('hidden');

// });