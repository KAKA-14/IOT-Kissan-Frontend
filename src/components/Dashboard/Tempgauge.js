import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Tempgauge = ({temperatureQuality}) => {
  const canvasRef = useRef(null);
  const [value, setValue] = useState(0); // Initial value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2474084/feeds.json?results=2"
        );
        const data = response.data;
        // Assuming the data structure has a field named "field1" containing the Celsius value
        const celsiusValue = Math.ceil(data.feeds[0].field1); // Parse Celsius value
        // Adjust the value to be between 1 and 100
        const adjustedValue = Math.min(Math.max(celsiusValue, 1), 100);
        setValue(adjustedValue); // Set adjusted value as the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 100); // Fetch data every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    let color;
    switch (temperatureQuality) {
      case "Good":
        color = "#94B686"; // Green color for good quality
        break;
      case "Average":
        color = "#E1B930"; // Yellow color for average quality
        break;
      case "Bad":
        color = "#C52B23"; // Red color for bad quality
        break;
      default:
        color = "#000000"; // Default color (black) in case of unexpected quality value
    }
    // Draw background circle
    context.beginPath();
    context.arc(centerX, centerY, radius * 0.9, 0, 2 * Math.PI);
    context.strokeStyle = color;
    context.lineWidth = radius * 0.1;
    context.setLineDash([8, 8]); // Set the dash pattern
    context.stroke();

    // Draw gauge arc
    context.beginPath();
    context.arc(
      centerX,
      centerY,
      radius * 0.9,
      Math.PI,
      Math.PI + (value / 60) * Math.PI,
      false
    );
    context.strokeStyle = "#000000";
    context.lineWidth = radius * 0.1;
    context.stroke();

    // Display value text
    context.fillStyle = "#000000";
    context.font = "20px Space Grotesk";
    context.textAlign = "center";
    context.fillText(`${value}°C`, centerX, centerY + radius * 0.2);
  }, [value]);

  return (
    <div className="c1">
      <canvas ref={canvasRef} width={180} height={180}></canvas>
    </div>
  );
};

export default Tempgauge;