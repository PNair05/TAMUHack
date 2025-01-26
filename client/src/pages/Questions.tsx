import { useState } from "react";

const initialData = {
  Performance: 50,
  Efficiency: 50,
  Budget: 50,
  Utility: 50,
  Type: 50,
};

const questions = [
  { id: "Performance", text: "Do you have a need for speed?" },
  { id: "Efficiency", text: "How much do you want to save on gas?" },
  { id: "Budget", text: "What is your budget?" },
  { id: "Utility", text: "How many groceries do you want to carry?" },
  { id: "Type", text: "Electric or Gas-Powered Vehicle?" },
];

export default function SliderAnswerSystem() {
  const [data, setData] = useState(initialData);

  const handleSliderChange = (id, value) => {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated Data:", data);
    // Here you can send the updated JSON data to a server or save it locally
  };

  return (
    <div style={{ padding: "16px", display: "space-between", gap: "16px" }}>
      {questions.map((question) => (
        <div
          key={question.id}
          style={{
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}
          >
            {question.text}
          </h3>
          <input
            type="range"
            value={data[question.id]}
            min={0}
            max={100}
            step={1}
            onChange={(e) => handleSliderChange(question.id, e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <p style={{ marginTop: "8px" }}>Current Value: {data[question.id]}</p>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Submit
      </button>
    </div>
  );
}
