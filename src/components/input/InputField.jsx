import React, { useEffect, useState } from 'react'
import './InputField.css'

import { getWeather } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SelectComponent from '../common/SelectComponent'
const API_KEY = '6f1c9ee91b22f5f1e5f8ccaecf1f8e81';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


const InputField = ({ setResult }) => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState({ city: '' })

    // changing input value
    const handleChange = (e) => {
        console.log(e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleOptionChange = (e) => {
        // console.log(e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })

        getWeatherDetails(e.target.value);
    }



    const getWeatherDetails = async (city) => {
        let response = await getWeather(city);
        setResult(response);

        if (response.main) {
            navigate(`/weather/${city}`);
        } else {
            navigate('/');
        }

        if (response.status === 404) {
            setError("Invalid city name");
        } else if (response.status === 400) {
            setError("Enter city name to get weather report");
        } else {
            setError('');
        }
    };

    const getCurrentLocationWeather = async () => {
        try {
            setIsLoading(true);
            const savePositionToState = async (position) => {
                try {
                    const response = await axios.get(`${API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`);

                    if (response.data.name !== "Globe") {
                        setData({ ...data, city: response.data.name });
                        getWeatherDetails(response.data.name);
                    }
                } catch (error) {
                    console.log("Error fetching weather data:", error);
                }
            };

            if (navigator.geolocation) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });

                    if (position) {
                        await savePositionToState(position);
                    }
                } catch (error) {
                    console.log("Error getting current location:", error);
                }
            }
        } catch (error) {
            console.log("Error while calling API:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='bg-white shadow-lg px-4 py-4'>
            <div className=' text-center text-xl py-2 text-blue-500 font-semibold'>
                <h1>Weather Station Dashboard</h1>
            </div>
            <hr />

            <div className="flex flex-col gap-4 px-10 py-10">
                {error && (
                    <div className="bg-red-600 text-white p-1 px-2 rounded width-fit-content text-xs">
                        <p>{error}</p>
                    </div>
                )}

                <input
                    className="py-2 border-blue-400 px-2 border rounded focus:outline-blue focus:border-blue-500"
                    name="city"
                    type="text"
                    placeholder="Enter city name"
                    onChange={(e) => handleChange(e)}
                    value={data.city}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            getWeatherDetails(data.city);
                        }
                    }}
                />

                <SelectComponent isLoading={isLoading} data={data} handleOptionChange={handleOptionChange} />

                <div className="relative top-12">
                    <hr className="absolute left-0 w-full border-gray-400 top-14" />
                    {/* <p className="absolute bg-white w-20 h-8 text-center text-gray-400 text-sm left-1/2 transform -translate-x-1/2 bottom-2">
                        or
                    </p> */}
                </div>
                <button
                    disabled={isLoading}
                    onClick={() => getCurrentLocationWeather()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    {isLoading ? (
                        <div className="relative inline-block w-8 h-8 mr-2">
                            <div className="absolute w-full h-full animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-safe:animate-spin"></div>
                            <span className="absolute top-1/2 left-12 transform -translate-y-1/2">Loading...</span>
                        </div>
                    ) : (
                        "Get Device Location"
                    )}
                </button>


            </div>

        </div >
    )
}

export default InputField