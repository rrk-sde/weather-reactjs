import axios from "axios";
import { useState } from "react";

const API_KEY = '6f1c9ee91b22f5f1e5f8ccaecf1f8e81';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';




export const getWeather = async (city) => {
    try {
        const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

const fetchWeather = async () => {
    try {
        const weatherData = await getWeather("patna");
        console.log(weatherData);
    } catch (error) {
        console.error("Error:", error);
    }
};

fetchWeather();

