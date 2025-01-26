import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/app.css";
import "./styles/navbar.css";

function App() {
  const [count, setCount] = useState(0);
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
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">ToyotAI</div>
        <ul className="navbar-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <header className="hero-section">
        <h1>Welcome to ToyotAI</h1>
        <p>Your modern solution for everything!</p>
      </header>
      <main className="content">
        <div className="card">
          <button
            className="button"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>

          <div className="user-list">
            {array.map((user, index) => (
              <div className="user-item" key={index}>
                <span>{user}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
