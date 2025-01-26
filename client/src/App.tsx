import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:6969/api/users");
    console.log(response.data.users); // This will print the users to the console
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    // <div className="app-container">
    //   <div className="user-list">
    //     {array.map((user, index) => (
    //       <div className="user-item" key={index}>
    //         <span>{user}</span>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ToyotAI - Homepage</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            font-family: Verdana, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f9;\n        }\n\n        header {\n            background-color: #333;\n            color: white;\n            padding: 10px 0;\n            text-align: center;\n        }\n\n        header h1 {\n            margin: 0;\n        }\n\n        .logo {\n            margin: 20px auto;\n            text-align: center;\n        }\n\n        .logo img {\n            width: 100px;\n            height: 100px;\n        }\n\n        .buttons {\n            text-align: center;\n            margin: 20px 0;\n        }\n\n        .buttons a {\n            display: inline-block;\n            margin: 10px;\n            padding: 15px 30px;\n            font-size: 16px;\n            color: white;\n            background-color: #007BFF;\n            text-decoration: none;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n\n        .buttons a:hover {\n            background-color: #0056b3;\n        }\n\n        .buttons a.secondary {\n            background-color: #28a745;\n        }\n\n        .buttons a.secondary:hover {\n            background-color: #1e7e34;\n        }\n\n        .hidden {\n            display: none;\n        }\n\n        .container {\n            width: 90%;\n            margin: 20px auto;\n            text-align: left;\n        }\n\n        .search-bar {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 20px;\n        }\n\n        .search-bar input {\n            width: 70%;\n            padding: 10px;\n            font-size: 16px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n        }\n\n        .search-bar select {\n            padding: 10px;\n            font-size: 16px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n        }\n\n        .car-list {\n            display: flex;\n            flex-wrap: wrap;\n            gap: 20px;\n        }\n\n        .car-item {\n            background-color: white;\n            border: 1px solid #ddd;\n            border-radius: 5px;\n            width: 23%;\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n            transition: transform 0.2s;\n        }\n\n        .car-item:hover {\n            transform: scale(1.02);\n        }\n\n        .car-image img {\n            width: 100%;\n            border-bottom: 1px solid #ddd;\n            border-top-left-radius: 5px;\n            border-top-right-radius: 5px;\n        }\n\n        .car-details {\n            padding: 15px;\n        }\n\n        .car-details h3 {\n            margin: 0 0 10px;\n            font-size: 18px;\n            color: #333;\n        }\n\n        .car-details p {\n            margin: 5px 0;\n            font-size: 14px;\n            color: #666;\n        }\n\n        .car-details .price {\n            font-size: 16px;\n            color: #007BFF;\n            font-weight: bold;\n            margin-top: 10px;\n        }\n\n        @media (max-width: 1200px) {\n            .car-item {\n                width: 31%;\n            }\n        }\n\n        @media (max-width: 768px) {\n            .car-item {\n                width: 48%;\n            }\n        }\n\n        @media (max-width: 480px) {\n            .car-item {\n                width: 100%;\n            }\n\n            .search-bar {\n                flex-direction: column;\n                align-items: flex-start;\n            }\n\n            .search-bar input {\n                width: 100%;\n                margin-bottom: 10px;\n            }\n\n            .search-bar select {\n                width: 100%;\n            }\n        }\n\n        .quiz-container {\n            background-color: #fff;\n            border: 1px solid #ddd;\n            border-radius: 5px;\n            width: 50%;\n            margin: 20px auto;\n            padding: 20px;\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n            text-align: left;\n        }\n\n        .quiz-container h3 {\n            margin-top: 0;\n        }\n\n        .quiz-container label {\n            display: block;\n            margin: 10px 0 5px;\n        }\n\n        .quiz-container input,\n        .quiz-container select {\n            width: 100%;\n            padding: 10px;\n            font-size: 16px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n            margin-bottom: 10px;\n        }\n\n        .quiz-container button {\n            background-color: #007BFF;\n            color: white;\n            padding: 10px 20px;\n            font-size: 16px;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n            margin-top: 10px;\n        }\n\n        .quiz-container button:hover {\n            background-color: #0056b3;\n        }\n    ",
        }}
      />
      <header>
        <header>
          <h1>ToyotAI - Find Your Perfect Car</h1>
        </header>
        <div className="logo">
          <img
            src="https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg"
            alt="ToyotAi Logo"
          />
        </div>
        <div className="buttons">
          <a href="#" id="find-car-btn">
            Find Your Ideal Car
          </a>
          <a href="#" id="see-all-cars-btn" className="secondary">
            See All Cars
          </a>
        </div>
        <div id="quiz-container" className="quiz-container hidden">
          <h3>Find Your Ideal Car</h3>
          <label htmlFor="description">
            What are you looking for in a car?
          </label>
          <input
            type="text"
            id="description"
            placeholder="e.g., sporty, fuel-efficient, spacious"
          />
          <button onclick="alert('We are working on personalized results!')">
            Submit
          </button>
          <button onclick="toggleQuiz()">Close</button>
        </div>
        <div id="car-list-container" className="container hidden">
          <div className="search-bar">
            <input
              type="text"
              id="ai-search"
              placeholder="Type a description (e.g., SUV under $30,000)"
            />
            <select id="sort-options">
              <option value="default">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
          <div id="car-list" className="car-list" />
        </div>
      </header>
    </>
  );
}

export default App;
