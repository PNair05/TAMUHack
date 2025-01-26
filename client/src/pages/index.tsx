// import React, { useState } from 'react';

// const cars = [
//     {
//         model: 'Toyota Supra',
//         type: 'Sports Car',
//         price: 50000,
//         image: 'https://example.com/supra.jpg',
//         description: 'A high-performance sports car with sleek design and powerful engine.'
//     }
// ];

// const App: React.FC = () => {
//     const [carList, setCarList] = useState(cars);
//     const [quizVisible, setQuizVisible] = useState(false);
//     const [searchPrompt, setSearchPrompt] = useState('');

//     const displayCars = (carList: typeof cars) => {
//         return carList.map(car => (
//             <div className="car-item" key={car.model}>
//                 <div className="car-image">
//                     <img src={car.image} alt={car.model} />
//                 </div>
//                 <div className="car-details">
//                     <h3>{car.model}</h3>
//                     <p>Type: {car.type}</p>
//                     <p className="price">${car.price.toLocaleString()}</p>
//                     <p>{car.description}</p>
//                 </div>
//             </div>
//         ));
//     };

//     const filterCarsByAI = (prompt: string) => {
//         const filteredCars = cars.filter(car =>
//             car.model.toLowerCase().includes(prompt.toLowerCase())
//         );
//         setCarList(filteredCars);
//     };

//     return (
//         <div>
//             <header>
//                 <h1>ToyotAI - Find Your Perfect Car</h1>
//             </header>
//             <div className="logo">
//                 <img src="https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg" alt="ToyotAi Logo" />
//             </div>
//             <div className="buttons">
//                 <a href="#" id="find-car-btn" onClick={() => setQuizVisible(true)}>Find Your Ideal Car</a>
//                 <a href="#" id="see-all-cars-btn" className="secondary" onClick={() => setCarList(cars)}>See All Cars</a>
//             </div>
//             {quizVisible && (
//                 <div id="quiz-container" className="quiz-container">
//                     <h3>Find Your Ideal Car</h3>
//                     <label htmlFor="description">What are you looking for in a car?</label>
//                     <input
//                         type="text"
//                         id="description"
//                         placeholder="e.g., sporty, fuel-efficient, spacious"
//                         onChange={(e) => setSearchPrompt(e.target.value)}
//                     />
//                     <button onClick={() => alert('We are working on personalized results!')}>Submit</button>
//                     <button onClick={() => setQuizVisible(false)}>Close</button>
//                 </div>
//             )}
//             <div id="car-list-container" className="container">
//                 <div className="search-bar">
//                     <input
//                         type="text"
//                         id="ai-search"
//                         placeholder="Type a description (e.g., SUV under $30,000)"
//                         value={searchPrompt}
//                         onChange={(e) => filterCarsByAI(e.target.value)}
//                     />
//                     <select id="sort-options">
//                         {/* Add sorting options here */}
//                     </select>
//                 </div>
//                 <div id="car-list">
//                     {displayCars(carList)}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default App;