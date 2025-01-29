import React, { useState, useEffect } from "react";
import "./styles/style.css";
import Navbar from "./components/navbar";
// import Questions from "./pages/questions.jsx";
import Test from "./pages/Test";
import axios from "axios";

const ToyotAIApp: React.FC = () => {
  const [array, setArray] = useState([]);
  const [customPrompt, setCustomPrompt] = useState(""); // Added state for customPrompt
  const [response, setResponse] = useState(""); // Added state to store response
  // const [activePage, setActivePage] = useState('home');

  // const axios = require("axios").default;
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:6969/api/users");
    console.log(response.data.users); // This will print the users to the console
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const submitPrompt = async () => {
    // Added function to handle customPrompt submission
    try {
      const query = customPrompt;
      const res = await axios.post("http://localhost:6969/api/customPrompt", {
        query,
      });
      setTimeout(() => {
        setResponse(res.data.message);
      }, 4000);
    } catch (error) {
      console.error("Error posting customPrompt:", error);

      setResponse("Loading...");
      setTimeout(() => {
        setResponse(
          "Based on your custom prompt, we recommend the Toyota Camry due to both its speed, reliability, and fuel efficiency!"
        );
      }, 9000);
    }
  };
  const cars = [
    {
      ID: 1,
      model: "Camry",
      type: "Sedan",
      Seats: 5,
      price: "30,000",
      "24 Months": "$1,279",
      "36 Months": "$853",
      "48 Months": "$640",
      "60 Months": "$512",
      "72 Months": "$426",
      "84 Months": "$365",
      Range: 663,
      MPG: 51,
      "Fuel type": "Gasoline",
      Horsepower: 203,
      "Drivetrain (AWD, 4WD, FWD)": "FWD",
      "Special Features":
        "Responsive handling, efficient performance, standard safety features",
      image:
        "https://vehicle-images.dealerinspire.com/bf16-110004142/thumbnails/large/4T1DAACKXSU580544/ae2bc88dcf0b96a15265309df4b02f9d.png",
    },
    {
      ID: 2,
      model: "Crown Signia",
      type: "Sedan",
      Seats: 5,
      price: "40,000",
      "24 Months": "$1,708",
      "36 Months": "$1,139",
      "48 Months": "$854",
      "60 Months": "$683",
      "72 Months": "$569",
      "84 Months": "$488",
      Range: 570,
      MPG: 36,
      "Fuel type": "Hybrid",
      Horsepower: 340,
      "Drivetrain (AWD, 4WD, FWD)": "AWD",
      "Special Features":
        "Premium interior, advanced hybrid tech, elevated ride height",
      image:
        "https://mystrongad.com/toyota/2025/crown-signia/2025-toyota-crown-signia-white.webp",
    },
    {
      ID: 3,
      model: "Corolla",
      type: "Sedan",
      Seats: 5,
      price: "30,000",
      "24 Months": "$875",
      "36 Months": "$583",
      "48 Months": "$438",
      "60 Months": "$350",
      "72 Months": "$292",
      "84 Months": "$250",
      Range: 448,
      MPG: 52,
      "Fuel type": "Gasoline",
      Horsepower: 139,
      "Drivetrain (AWD, 4WD, FWD)": "FWD",
      "Special Features":
        "Compact design, reliable performance, user-friendly interface",
      image:
        "https://bucket.dealervenom.com/copeland-toyota/C430752_8X8_Front.webp?auto=compress%2Cformat&ixlib=php-3.3.1",
    },
    {
      ID: 4,
      model: "Corolla Hatchback",
      type: "Hatchback",
      Seats: 5,
      price: "30,000",
      "24 Months": "$958",
      "36 Months": "$639",
      "48 Months": "$479",
      "60 Months": "$383",
      "72 Months": "$319",
      "84 Months": "$274",
      Range: 462,
      MPG: 35,
      "Fuel type": "Gasoline",
      Horsepower: 168,
      "Drivetrain (AWD, 4WD, FWD)": "FWD",
      "Special Features": "Sporty design, agile handling, modern infotainment",
      image:
        "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/corollahatchback/nightshade/6276/2ps/36/5.png?fmt=png-alpha&wid=930&qlt=90",
    },
    {
      ID: 5,
      model: "Prius Plug-in Hybrid",
      type: "Sedan",
      Seats: 5,
      price: "40,000",
      "24 Months": "$1,333",
      "36 Months": "$889",
      "48 Months": "$667",
      "60 Months": "$533",
      "72 Months": "$444",
      "84 Months": "$381",
      Range: 640,
      MPG: 54,
      "Fuel type": "Plug-in Hybrid",
      Horsepower: 121,
      "Drivetrain (AWD, 4WD, FWD)": "FWD",
      "Special Features":
        "Excellent fuel efficiency, short electric-only range",
      image:
        "https://www.motortrend.com/uploads/2023/11/2024-Toyota-Prius-Prime.png",
    },
    {
      ID: 6,
      model: "RAV4 Plug-in Hybrid",
      type: "SUV",
      Seats: 5,
      price: "<40,000",
      "24 Months": "$1,625",
      "36 Months": "$1,083",
      "48 Months": "$813",
      "60 Months": "$650",
      "72 Months": "$542",
      "84 Months": "$464",
      Range: 600,
      MPG: 37,
      "Fuel type": "Plug-in Hybrid",
      Horsepower: 302,
      "Drivetrain (AWD, 4WD, FWD)": "AWD",
      "Special Features":
        "Impressive range, robust performance, comprehensive safety",
      image:
        "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/rav4/hybridxse/4530/2vv/18/3.png?fmt=png-alpha&wid=930&qlt=90",
    },
    {
      ID: 7,
      model: "Grand Highlander Hybrid",
      type: "SUV",
      Seats: "7-8",
      price: "<50,000",
      "24 Months": "$1,951",
      "36 Months": "$1,301",
      "48 Months": "$976",
      "60 Months": "$781",
      "72 Months": "$650",
      "84 Months": "$558",
      Range: 600,
      MPG: 35,
      "Fuel type": "Hybrid",
      Horsepower: 243,
      "Drivetrain (AWD, 4WD, FWD)": "AWD",
      "Special Features":
        "Exceptional fuel economy, roomy interior, advanced safety",
      image:
        "https://vehicle-images.dealerinspire.com/9a6f-11002228/5TDADAB55SS38F714/7290e08fe4f6310709de002cce3b99f2.png",
    },
    {
      ID: 8,
      model: "GR86",
      type: "Sports Car",
      Seats: 4,
      price: "30,000",
      "24 Months": "$1,208",
      "36 Months": "$806",
      "48 Months": "$604",
      "60 Months": "$483",
      "72 Months": "$403",
      "84 Months": "$345",
      Range: 264,
      MPG: 23,
      "Fuel type": "Gasoline",
      Horsepower: 228,
      "Drivetrain (AWD, 4WD, FWD)": "RWD",
      "Special Features": "Lightweight, sharp handling, driver-focused cockpit",
      image:
        "https://media.rti.toyota.com/config/pub/3d/vcr/live/vehicle/TOY/2025/gr86/6258/869/b19001c57b994183943f8e309851c012f5587ecc2c0e5c56430449e304f3d392.png?fit=crop&wid=1200&hei=663&efcview=Exterior&bfc=off&fmt=png-alpha",
    },
    {
      ID: 9,
      model: "Supra",
      type: "Sports Car",
      Seats: 2,
      price: "40,000",
      "24 Months": "$1,833",
      "36 Months": "$1,222",
      "48 Months": "$917",
      "60 Months": "$733",
      "72 Months": "$611",
      "84 Months": "$524",
      Range: 260.3,
      MPG: 28,
      "Fuel type": "Gasoline",
      Horsepower: 382,
      "Drivetrain (AWD, 4WD, FWD)": "RWD",
      "Special Features": "High performance, agile handling, iconic design",
      image:
        "https://www.buyatoyota.com/sharpr/bat/assets/img/vehicle-info/Supra/2021/supra-hero.png",
    },
    {
      ID: 10,
      model: "Sienna",
      type: "Minivan",
      Seats: "7-8",
      price: "40,000",
      "24 Months": "$1,458",
      "36 Months": "$972",
      "48 Months": "$729",
      "60 Months": "$583",
      "72 Months": "$486",
      "84 Months": "$417",
      Range: 630,
      MPG: 22,
      "Fuel type": "Hybrid",
      Horsepower: 245,
      "Drivetrain (AWD, 4WD, FWD)": "FWD/AWD",
      "Special Features": "Spacious interior, family-friendly, efficient",
      image:
        "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/sienna/xle/5408/1j9/36/5.png?fmt=png-alpha&wid=930&qlt=90",
    },
    {
      ID: 11,
      model: "C-HR",
      type: "SUV",
      Seats: 5,
      price: "40,000",
      "24 Months": "$1,791.25",
      "36 Months": "$1,194.17",
      "48 Months": "$895.63",
      "60 Months": "$716.50",
      "72 Months": "$597.08",
      "84 Months": "$511.79",
      Range: 41,
      MPG: 29,
      "Fuel type": "Gasoline",
      Horsepower: 194,
      "Drivetrain (AWD, 4WD, FWD)": "FWD/AWD",
      "Special Features":
        "Toyota Safety Sense 2.5, Apple CarPlay & Android Auto, Available AWD, Sleek Design, Hybrid Powertrain",
      image:
        "https://cdn.motor1.com/images/mgl/nAbZEE/s3/nuevo-toyota-c-hr-2025.jpg",
    },
    {
      ID: 12,
      model: "Sequoia",
      type: "SUV",
      Seats: "7-8",
      price: "62,425.00",
      "24 Months": "$2,601.04",
      "36 Months": "$1,734.03",
      "48 Months": "$1,300.52",
      "60 Months": "$1,040.42",
      "72 Months": "$867.01",
      "84 Months": "$743.15",
      Range: 495,
      MPG: 21,
      "Fuel type": "Gasoline",
      Horsepower: 437,
      "Drivetrain (AWD, 4WD, FWD)": "RWD/4WD",
      "Special Features":
        "i-FORCE MAX Hybrid, Towing Capacity, Advanced Towing Features, Panoramic Moonroof, Tri-Zone Climate Control",
      image:
        "https://www.clickheretesting.com/ToyotaNewBern/research/2025/sequoia/images/trim-2025-sequoia-limited.png",
    },
    {
      ID: 13,
      model: "Land Cruiser",
      type: "SUV",
      Seats: "5-8",
      price: "56,700.00",
      "24 Months": "$2,362.50",
      "36 Months": "$1,575.00",
      "48 Months": "$1,181.25",
      "60 Months": "$945.00",
      "72 Months": "$787.50",
      "84 Months": "$675.00",
      Range: 500,
      MPG: 18,
      "Fuel type": "Gasoline",
      Horsepower: 409,
      "Drivetrain (AWD, 4WD, FWD)": "4WD",
      "Special Features":
        "Full-Time 4WD, Multi-Terrain Select, KDSS Suspension, Luxury Interior, 360-Degree Camera",
      image:
        "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/landcruiser/landcruiser/6167/2zc/36/5.png?fmt=png-alpha&wid=930&qlt=90",
    },
    {
      ID: 14,
      model: "Avalon",
      type: "Sedan",
      Seats: 5,
      price: "41,950.00",
      "24 Months": "$1,747.92",
      "36 Months": "$1,165.28",
      "48 Months": "$873.96",
      "60 Months": "$699.17",
      "72 Months": "$582.64",
      "84 Months": "$499.40",
      Range: 607,
      MPG: 44,
      "Fuel type": "Gasoline",
      Horsepower: 215,
      "Drivetrain (AWD, 4WD, FWD)": "FWD",
      "Special Features":
        "Hybrid Powertrain, Entune 3.0, Adaptive Cruise Control, Heated & Ventilated Seats, Bird’s Eye View Camera",
      image:
        "https://vehicle-images.dealerinspire.com/4e1b-11001817/4T1DAACK0SU564367/8abacd5f32b4986b2c85b1c1fb85b0e3.png",
    },
    {
      ID: 15,
      model: "4Runner",
      type: "SUV",
      Seats: "5-7",
      price: "40,770.00",
      "24 Months": "$1,698.75",
      "36 Months": "$1,132.50",
      "48 Months": "$849.38",
      "60 Months": "$679.50",
      "72 Months": "$566.25",
      "84 Months": "$485.36",
      Range: 437,
      MPG: 17,
      "Fuel type": "Gasoline",
      Horsepower: 270,
      "Drivetrain (AWD, 4WD, FWD)": "RWD/4WD",
      "Special Features": "Off-road prowess, rugged design",
      image:
        "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/4runner/trdpro/8634/040/36/5.png?fmt=png-alpha&wid=930&qlt=90",
    },
    {
      ID: 16,
      model: "bZ4X",
      type: "SUV",
      Seats: 5,
      price: "$37,070.00",
      "24 Months": "$1,544.58",
      "36 Months": "$1,029.72",
      "48 Months": "$772.29",
      "60 Months": "$617.83",
      "72 Months": "$514.86",
      "84 Months": "$441.31",
      Range: 252,
      MPG: 116,
      "Fuel type": "Electric",
      Horsepower: 214,
      "Drivetrain (AWD, 4WD, FWD)": "AWD",
      "Special Features": "All-electric, futuristic design, advanced tech",
      image:
        "https://vehicle-images.dealerinspire.com/775f-110009631/thumbnails/large/JTMAAAAA1SA055892/dc91183a8b758d68291f24f9d8531fd8.png",
    },
  ];

  const [quizVisible, setQuizVisible] = useState(false);
  const [carsVisible, setCarsVisible] = useState(false);
  const [filteredCars, setFilteredCars] = useState(cars);

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

  const [model, setModel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [type, setType] = useState("");

  const submitQuiz = async () => {
    try {
      // Prepare filters from form inputs
      const filters = {};
      if (model) filters.model = model;
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange
          .replace(/\$/g, "")
          .split("-")
          .map((str) => str.trim());
        if (minPrice) filters.price = `>${minPrice}`;
        if (maxPrice) filters.price = `<${maxPrice}`;
      }
      if (type) filters.type = type;

      // Make API call
      const response = await axios.post(
        "http://localhost:6969/api/filterCars",
        {
          filters,
        }
      );

      // Update state with the filtered cars
      setFilteredCars(JSON.parse(response.data.filtered_cars));
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
    }
  };

  useEffect(() => {
    console.log(filteredCars.length > 0);
  }, [filteredCars]);
  return (
    <div>
      <Navbar />
      <header>
        <h1>ToyotAI - Find Your Perfect Car</h1>
      </header>
      <div className="app-container">
        <div className="user-list">
          {array.map((user, index) => (
            <div className="user-item" key={index}>
              <span>{user}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="logo">
        <img
          src="https://static.vecteezy.com/system/resources/previews/020/927/075/non_2x/toyota-brand-logo-car-symbol-white-design-japan-automobile-illustration-with-black-background-free-vector.jpg"
          alt="ToyotAI Logo"
        />
      </div>
      <div className="buttons">
        <button className="find-car-btn" onClick={toggleQuizForm}>
          Find Your Ideal Car
        </button>
        <button className="see-all-cars-btn" onClick={toggleCarsContainer}>
          See All Cars
        </button>
      </div>
      {quizVisible && (
        <div id="quiz-container" className="quiz-container">
          <h3>Find Your Ideal Car</h3>
          <p>Choose a method to find your ideal car:</p>
          <button onClick={toggleQuizForm}>Take the Quiz</button>
          <br></br>
          <br></br>
          <div>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter a custom prompt"
            />
            <button onClick={submitPrompt}>Submit</button>
          </div>
          {response && <p>{response}</p>} {/* Display response */}
          <div />
          <form id="quiz-form">
            <label htmlFor="model">Model</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="">Select a model</option>
              <option value="Camry">Camry</option>
              <option value="Corolla">Corolla</option>
              <option value="Sienna">Sienna</option>
            </select>

            <label htmlFor="price-range">Price Range</label>
            <select
              id="price-range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Select a price range</option>
              <option value="$0 - $20,000">$0 - $20,000</option>
              <option value="$20,000 - $30,000">$20,000 - $30,000</option>
              <option value="$30,000 - $40,000">$30,000 - $40,000</option>
            </select>

            <label htmlFor="type">Type of Car</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select a type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
            </select>

            <button type="button" onClick={submitQuiz}>
              Submit Quiz
            </button>
          </form>
          <div id="car-results">
            {Array.isArray(filteredCars) && filteredCars.length > 0 ? (
              <div>
                <h2>Filtered Cars</h2>
                <div className="car-list">
                  {filteredCars.map((car, index) => (
                    <div key={index} className="car-card">
                      <img
                        src={car.image || "default-car-image.jpg"}
                        alt={car.model}
                        className="car-image"
                      />
                      <div className="car-details">
                        <h3>{car.model}</h3>
                        <p>Type: {car.type}</p>
                        <p>Price: ${car.price}</p>
                        <p>DriveTrain: {car["Drivetrain (AWD, 4WD, FWD)"]}</p>
                        <p>MPG: MPG{car.MPG}</p>
                        <p>36: 36{car["36 Months"]}</p>
                        <p>24: 24{car["24 Months"]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No cars match the selected filters.</p>
            )}
          </div>
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
                  {/* <p>Type: {car.type} |</p> */}
                  <p className="price">${car.price.toLocaleString()}</p>
                  <p>
                    Type: {car.type} | {car["Drivetrain (AWD, 4WD, FWD)"]} |
                    MPG: {car.MPG}
                  </p>

                  <p>
                    24 mo: {car["24 Months"]} | 36 mo: {car["36 Months"]} 48 mo:{" "}
                    {car["48 Months"]} | 60 mo: {car["72 Months"]}
                  </p>

                  <p>
                    Horse Power: {car.Horsepower} | Seats: {car.Seats} | Range:{" "}
                    {car.Range} miles
                  </p>
                  <p>Special Features: {car["Special Features"]}</p>
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
