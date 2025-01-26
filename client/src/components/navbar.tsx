// Import the questions page

import Questions from "../pages/questions.tsx";
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
      <nav
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          padding: "10px 20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            justifyContent: "center",
            gap: "20px",
            padding: 0,
            margin: 0,
          }}
        >
          {[
            { name: "Home", id: "home" },
            { name: "Personality Quiz", id: "questions" },
            { name: "Test", id: "test" },
          ].map((page) => (
            <li
              key={page.id}
              onClick={() => handlePageChange(page.id)}
              style={{
                padding: "10px 20px",
                color: activePage === page.id ? "#e94560" : "#A5ACB2",
                backgroundColor:
                  activePage === page.id
                    ? "rgba(233, 69, 96, 0.2)"
                    : "transparent",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
            >
              {page.name}
            </li>
          ))}
        </ul>
      </nav>

      <div
        style={{
          padding: "20px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: "12px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.7)",
          marginTop: "20px",
          color: "#fff",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        {activePage === "home"}
        {activePage === "questions" && <Questions />}
        {activePage === "test" && <Test />}
      </div>
    </div>
  );
};

export default Navbar;
