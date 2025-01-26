import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

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
    <div className="p-4 space-y-6">
      {questions.map((question) => (
        <Card key={question.id} className="p-4 shadow-lg rounded-lg">
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
            <Slider
              defaultValue={[data[question.id]]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleSliderChange(question.id, value[0])}
            />
            <p className="mt-2">Current Value: {data[question.id]}</p>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSubmit} className="w-full mt-4">
        Submit
      </Button>
    </div>
  );
}
