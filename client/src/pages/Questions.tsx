import { Car, Zap, Gauge, ShieldCheck } from "lucide-react";
import { useState } from "react";

const initialData = {
  Performance: 3,
  Efficiency: 3,
  Budget: 3,
  Utility: 3,
  Type: 3,
};

const questions = [
  { id: "Performance", text: "Do you have a need for speed?" },
  { id: "Efficiency", text: "How much do you want to save on gas?" },
  { id: "Budget", text: "What is your budget?" },
  { id: "Utility", text: "How many groceries do you want to carry?" },
  { id: "Type", text: "Electric or Gas-Powered Vehicle?" },
];

export default function CarPersonalityQuiz() {
  const [data, setData] = useState(initialData);

  const handleSelectionChange = (id, value) => {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated Data:", data);
    const responseJSON = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    console.log(responseJSON);
  };

  return (
    <>
      <header
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          color: "#fff",
          padding: "40px 20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: "4px solid #0f3460",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%)",
            animation: "pulse 10s infinite alternate",
            zIndex: 1,
          }}
        />

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            position: "relative",
            zIndex: 2,
            textShadow: "0 0 10px rgba(16, 33, 62, 0.5)",
            transform: "perspective(500px) rotateX(10deg)",
            transition: "all 0.3s ease",
          }}
        >
          🚗 Wheels of Destiny
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            color: "#e94560",
            position: "relative",
            zIndex: 2,
            animation: "fadeIn 1.5s ease-out",
          }}
        >
          Unlock Your Automotive Soul Mate
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {[
            { icon: Car, color: "#0f3460" },
            { icon: Zap, color: "#e94560" },
            { icon: Gauge, color: "#16213e" },
            { icon: ShieldCheck, color: "#0f3460" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: item.color,
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: `float ${
                  index * 0.5 + 1
                }s ease-in-out infinite alternate`,
                boxShadow: `0 0 15px ${item.color}`,
              }}
            >
              <item.icon color="white" size={30} />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes pulse {
            0% { transform: scale(1) }
            100% { transform: scale(1.2) }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            from { transform: translateY(-10px); }
            to { transform: translateY(10px); }
          }
        `}</style>
      </header>

      <div
        style={{
          padding: "24px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          backdropFilter: "blur(15px)",
          borderRadius: "12px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.7)",
          maxWidth: "500px",
          margin: "20px auto",
          fontFamily: "'Orbitron', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%)",
            animation: "pulse 10s infinite alternate",
            zIndex: 1,
          }}
        />
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              padding: "20px",
              backgroundColor: "rgba(38, 38, 38, 0.85)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
              marginBottom: "20px",
              transition: "all 0.3s ease-in-out",
              position: "relative",
              zIndex: 2,
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#e94560",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              {question.text}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  color: "#A5ACB2",
                  fontSize: "14px",
                }}
              >
                No
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    style={{
                      color:
                        data[question.id] === value ? "#e94560" : "#A5ACB2",
                      cursor: "pointer",
                      fontSize: "18px",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      backgroundColor:
                        data[question.id] === value
                          ? "rgba(233, 69, 96, 0.2)"
                          : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {value}
                    <input
                      type="radio"
                      name={question.id}
                      value={value}
                      checked={data[question.id] === value}
                      onChange={() => handleSelectionChange(question.id, value)}
                      style={{ display: "none" }}
                    />
                  </label>
                ))}
              </div>
              <span
                style={{
                  color: "#A5ACB2",
                  fontSize: "14px",
                }}
              >
                Absolutely
              </span>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#e94560",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            position: "relative",
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff6b8a";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#e94560";
            e.target.style.transform = "scale(1)";
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
