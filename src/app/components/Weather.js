"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaWind, FaCloud } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import Modal from "@/app/components/Modal";
import Modal1 from "@/app/components/Modal1";
import Modal2 from "@/app/components/Modal2";

const apiKey = "36e5ea441de6a9d5ffaa56c6bb53b2ff";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  let iconUrl = weatherData
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : null;

  return (
    <div
      className="flex justify-center items-center min-h-screen transition-all duration-500"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      {/* 🟣 Weather Container */}
      <div
        className="p-8 rounded-2xl shadow-lg border-4 transition-all duration-500 w-[450px] md:w-[500px]"
        style={{
          backgroundColor: "var(--w-color)",
          color: "var(--primary-text-color)",
          borderColor: "var(--d-color)",
        }}
      >
        {/* 🔍 Stylish Search Bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-6">
          <div className="relative w-full">
            <input
              type="text"
              className="px-5 py-3 w-full rounded-full shadow-lg border transition-all duration-300 focus:outline-none focus:ring-4 text-lg"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                backgroundColor: "var(--l-color)",
                borderColor: "var(--primary-text-color)",
                color: "var(--primary-text-color)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* 🔍 Gradient Search Button */}
          <button
            className="px-5 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 text-lg focus:ring-2 focus:ring-opacity-50"
            style={{
              background: "linear-gradient(135deg, var(--d-color), var(--x-color))",
              color: "var(--secondary-text-color)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            🔍
          </button>
        </form>

        {/* 🌦 Weather Data */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500"></div>
          </div>
        ) : weatherData ? (
          <div className="text-center">
            <img className="mx-auto w-28 h-28" src={iconUrl} alt="Weather Icon" />
            <h2 className="text-3xl font-bold">{weatherData.name}</h2>
            <p className="text-xl font-semibold mt-2">{Math.round(weatherData.main.temp)}°C</p>

            {/* Weather Detail Icons */}
            <div className="flex justify-center gap-6 mt-6 text-4xl">
              <FaCloud
                className="cursor-pointer hover:text-blue-500 transition-all"
                onClick={() => setActiveModal("description")}
              />
              <WiHumidity
                className="cursor-pointer hover:text-green-500 transition-all"
                onClick={() => setActiveModal("humidity")}
              />
              <FaWind
                className="cursor-pointer hover:text-yellow-500 transition-all"
                onClick={() => setActiveModal("wind")}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* 📝 Modals */}
      {activeModal === "description" && (
        <Modal2 cModal2={() => setActiveModal(null)} Desc={weatherData?.weather[0].description} />
      )}
      {activeModal === "humidity" && (
        <Modal closeModal={() => setActiveModal(null)} Humidity={weatherData?.main.humidity} />
      )}
      {activeModal === "wind" && (
        <Modal1 cModal1={() => setActiveModal(null)} Wind={weatherData?.wind.speed} />
      )}
    </div>
  );
}

export default Weather;
