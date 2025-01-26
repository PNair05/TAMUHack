import React, { useState } from "react";
import "./styles/style.css";

const ToyotAIApp: React.FC = () => {
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

  const [quizVisible, setQuizVisible] = useState(false);
  const [carsVisible, setCarsVisible] = useState(false);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [customPrompt, setCustomPrompt] = useState("");

  const toggleQuizForm = () => {
    setQuizVisible(!quizVisible);
    setCarsVisible(false);
  };
  const toggleCarsContainer = () => setCarsVisible(!carsVisible);

  const handleAISearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = event.target.value.toLowerCase();
    const filtered = cars.filter(
      (car) =>
        car.model.toLowerCase().includes(searchInput) ||
        car.type.toLowerCase().includes(searchInput) ||
        car.description.toLowerCase().includes(searchInput) ||
        car.price.toString().includes(searchInput)
    );
    setFilteredCars(filtered);
  };

  const sortCarsByPrice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    let sortedCars;

    if (sortOption === "lowest") {
      sortedCars = [...cars].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highest") {
      sortedCars = [...cars].sort((a, b) => b.price - a.price);
    } else {
      sortedCars = cars;
    }

    setFilteredCars(sortedCars);
  };

  const submitQuiz = () => {
    alert("Quiz Submitted!");
  };

  const submitPrompt = () => {
    alert("Custom search submitted!");
  };

  return (
    <div>
      <header>
        <h1>ToyotAI - Find Your Perfect Car</h1>
      </header>
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlh9-G6jifPvpfVs9e2BCZVlvVbOKREZneyg&s"
          alt="ToyotAI Logo"
        />
      </div>
      <div className="buttons">
        <button id="find-car-btn" onClick={toggleQuizForm}>
          Find Your Ideal Car
        </button>
        <button
          id="see-all-cars-btn"
          className="secondary"
          onClick={toggleCarsContainer}
        >
          See All Cars
        </button>
      </div>

      {quizVisible && (
        <div id="quiz-container" className="quiz-container">
          <h3>Find Your Ideal Car</h3>
          <p>Choose a method to find your ideal car:</p>
          <button onClick={toggleQuizForm}>Take the Quiz</button>
          <br></br>
          <div className="custom-prompt">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter a custom prompt"
            />
            <button onClick={submitPrompt}>Submit</button>
          </div>
          <button onClick={submitPrompt}>Enter a Custom Prompt</button>
          <form id="quiz-form">
            <label htmlFor="model">Model</label>
            <input type="text" id="model" placeholder="e.g., Camry, Corolla" />

            <label htmlFor="price-range">Price Range</label>
            <input
              type="text"
              id="price-range"
              placeholder="e.g., $20,000 - $30,000"
            />

            <label htmlFor="type">Type of Car</label>
            <input type="text" id="type" placeholder="e.g., SUV, Sedan" />

            <button type="button" onClick={submitQuiz}>
              Submit Quiz
            </button>
          </form>
        </div>
      )}

      {carsVisible && (
        <div id="car-list-container" className="container">
          <h3>See All Cars</h3>
          <div className="ai-search-bar">
            <input
              type="text"
              id="ai-search-input"
              placeholder="Type your search preferences, e.g., SUV under $30,000"
              onChange={handleAISearch}
            />
            <button onClick={() => handleAISearch}>Search</button>
          </div>
          <div className="filter-options">
            <select id="sort-options" onChange={sortCarsByPrice}>
              <option value="featured">Featured</option>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
            </select>
          </div>
          <div id="car-list" className="car-list grid-layout">
            {filteredCars.map((car) => (
              <div key={car.model} className="car-item">
                <div className="car-image">
                  <img src={car.image} alt={car.model} />
                </div>
                <div className="car-details">
                  <h3>{car.model}</h3>
                  <p>Type: {car.type}</p>
                  <p className="price">${car.price.toLocaleString()}</p>
                  <p>{car.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToyotAIApp;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import './st'
// function App() {
//   const [array, setArray] = useState([]);

//   const fetchAPI = async () => {
//     const response = await axios.get("http://localhost:6969/api/users");
//     console.log(response.data.users); // This will print the users to the console
//     setArray(response.data.users);
//   };

//   useEffect(() => {
//     fetchAPI();
//   }, []);

//   //   <div className="app-container">
//   //   <div className="user-list">
//   //     {array.map((user, index) => (
//   //       <div className="user-item" key={index}>
//   //         <span>{user}</span>
//   //       </div>
//   //     ))}
//   //   </div>
//   // </div>
//   return (
//     <>
//       <meta charSet="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>ToyotAI - Homepage</title>
//       <link rel="stylesheet" href="../styles/style.css" />
//       <header>
//         <h1>ToyotAI - Find Your Perfect Car</h1>
//       </header>
//       <div className="logo">
//         <img
//           src="https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg"
//           alt="ToyotAI Logo"
//         />
//       </div>
//       <div className="buttons">
//         <a href="#" id="find-car-btn">
//           Find Your Ideal Car
//         </a>
//         <a href="#" id="see-all-cars-btn" className="secondary">
//           See All Cars
//         </a>
//       </div>
//       {/* Find Your Ideal Car Section */}
//       <div id="quiz-container" className="quiz-container hidden">
//         <h3>Find Your Ideal Car</h3>
//         <p>Choose a method to find your ideal car:</p>
//         <button onClick={() => toggleQuizForm()}>Take the Quiz</button>
//         <button onclick="toggleSearchPrompt()">Enter a Custom Prompt</button>
//         {/* Quiz Form */}
//         <div id="quiz-form" className="hidden">
//           <label htmlFor="model">Model</label>
//           <input type="text" id="model" placeholder="e.g., Camry, Corolla" />
//           <label htmlFor="price-range">Price Range</label>
//           <input
//             type="text"
//             id="price-range"
//             placeholder="e.g., $20,000 - $30,000"
//           />
//           <label htmlFor="type">Type of Car</label>
//           <input type="text" id="type" placeholder="e.g., SUV, Sedan" />
//           <label htmlFor="personality">Personality</label>
//           <input
//             type="text"
//             id="personality"
//             placeholder="e.g., sporty, family-friendly"
//           />
//           <label htmlFor="mpg">Miles Per Gallon (MPG)</label>
//           <input type="number" id="mpg" placeholder="e.g., 25" />
//           <label htmlFor="seats">Seats</label>
//           <input type="number" id="seats" placeholder="e.g., 5" />
//           <label htmlFor="fuel-type">Fuel Type</label>
//           <input
//             type="text"
//             id="fuel-type"
//             placeholder="e.g., Gasoline, Electric"
//           />
//           <label htmlFor="horsepower">Horsepower</label>
//           <input type="number" id="horsepower" placeholder="e.g., 300" />
//           <label htmlFor="interior">Interior Features</label>
//           <input
//             type="text"
//             id="interior"
//             placeholder="e.g., leather, touchscreen"
//           />
//           <label htmlFor="drivetrain">Drivetrain</label>
//           <input type="text" id="drivetrain" placeholder="e.g., AWD, FWD" />
//           <button onclick="submitQuiz()">Submit Quiz</button>
//         </div>
//         {/* Custom Prompt */}
//         <div id="custom-prompt" className="hidden">
//           <label htmlFor="ai-prompt">Enter Your Custom Preferences</label>
//           <input
//             type="text"
//             id="ai-prompt"
//             placeholder="e.g., Reliable SUV under $30,000"
//           />
//           <button onclick="submitPrompt()">Search</button>
//         </div>
//       </div>
//       {/* See All Cars Section */}
//       <div id="car-list-container" className="container hidden">
//         <h3>See All Cars</h3>
//         <div className="ai-search-bar">
//           <input
//             type="text"
//             id="ai-search-input"
//             placeholder="Type your search preferences, e.g., SUV under $30,000"
//             oninput="handleAISearch()"
//           />
//           <button onclick="handleAISearch()">Search</button>
//         </div>
//         <div className="filter-options">
//           <select id="sort-options" onchange="sortCarsByPrice()">
//             <option value="featured">Featured</option>
//             <option value="lowest">Lowest Price</option>
//             <option value="highest">Highest Price</option>
//           </select>
//         </div>
//         <div id="car-list" className="car-list grid-layout" />
//       </div>
//     </>
//   );
// }

// export default App;
