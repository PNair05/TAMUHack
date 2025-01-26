// import Questions from "./pages/questions.tsx";
// Import the questions page
import Test from "../pages/test.tsx";
import { useState } from "react";

// Import the test page

const Navbar = () => {
  const [activePage, setActivePage] = useState("home");

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <div>
      <nav style={{ background: "#333", padding: "10px" }}>
        <ul style={{ display: "flex", listStyleType: "none" }}>
          <li
            onClick={() => handlePageChange("home")}
            style={{
              margin: "0 20px",
              color: activePage === "home" ? "yellow" : "white",
              cursor: "pointer",
            }}
          >
            Home
          </li>
          <li
            onClick={() => handlePageChange("questions")}
            style={{
              margin: "0 20px",
              color: activePage === "questions" ? "yellow" : "white",
              cursor: "pointer",
            }}
          >
            Personality Quiz
          </li>
          <li
            onClick={() => handlePageChange("test")}
            style={{
              margin: "0 20px",
              color: activePage === "test" ? "yellow" : "white",
              cursor: "pointer",
            }}
          >
            Test
          </li>
        </ul>
      </nav>

      <div style={{ padding: "20px" }}>
        {activePage === "home"}
        {activePage === "questions" && <Questions />}
        {activePage === "Test" && <Test />}
      </div>
    </div>
  );
};

export default Navbar;
