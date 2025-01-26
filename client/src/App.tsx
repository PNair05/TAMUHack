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
    <div className="app-container">
      <div className="user-list">
        {array.map((user, index) => (
          <div className="user-item" key={index}>
            <span>{user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
