import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        {array.map((users, index) => (
          <div key={index}>
            <span>{users}</span>
            <br></br>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
