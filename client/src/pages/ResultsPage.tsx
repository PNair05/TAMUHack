import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function ResultsPage() {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "#e0e0e0",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#e94560",
            textShadow: "0px 0px 10px rgba(233, 69, 96, 0.8)",
          }}
        >
          🚘 Your Car Personality Results
        </h1>
      </header>

      <section
        style={{
          marginBottom: "40px",
          background: "#2e2e2e",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", color: "#e94560" }}>
          Recommended Car Models:
        </h2>
        <ul
          style={{ marginTop: "20px", fontSize: "1.2rem", listStyle: "none" }}
        >
          {["Toyota Corolla", "Toyota Camry", "Toyota Avalon"].map(
            (model, index) => (
              <li
                key={index}
                style={{
                  padding: "10px 0",
                  borderBottom: index < 4 ? "1px solid #444" : "none",
                }}
              >
                {model}
              </li>
            )
          )}
        </ul>
      </section>

      <section
        style={{
          background: "#2e2e2e",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", color: "#e94560" }}>
          Recommended Attributes:
        </h2>
        <ul
          style={{ marginTop: "20px", fontSize: "1.2rem", listStyle: "none" }}
        >
          {[
            { key: "Category", value: "Sedan" },
            { key: "Seats", value: 4 },
            { key: "Price", value: 20000 },
            { key: "Drivetrain", value: "RWD" },
          ].map((attribute, index) => (
            <li
              key={index}
              style={{
                padding: "10px 0",
                borderBottom: index < 3 ? "1px solid #444" : "none",
              }}
            >
              <strong>{attribute.key}:</strong> {attribute.value}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ResultsPage" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default ResultsPage;
