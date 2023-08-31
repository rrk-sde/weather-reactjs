import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
// react icons
import { ImLocation } from 'react-icons/im'
import { BsArrowLeftShort } from 'react-icons/bs'
import { BsThermometerSun } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import Cloud from '../../assets/clouds.png'
import Clear from '../../assets/clear.png'
import Rain from '../../assets/rain.png'
import Drizzle from '../../assets/drizzle.png'
import Mist from '../../assets/mist.png'
import { getWeather } from '../../services/api'
import animagif from '../../assets/animation-gif.gif'
// import GlobeComponent from '../globe/GlobeComponent'



const WeatherReport = ({ data }) => {

    const { city } = useParams()

    const [result, setResult] = useState(data)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                let response = await getWeather(city);
                setResult(response);
                setCoordi(response.coord)
                console.log(response);
            } catch (error) {
                console.error("Error fetching weather:", error);
                if (error) {
                    navigate('/')
                }
            }
        };
        Object.keys(data).length == 0 && fetchWeather();
    }, [city]);



    const weatherToImagePath = {
        "Clouds": Cloud,
        "Clear": Clear,
        "Rain": Rain,
        "Drizzle": Drizzle,
        "Mist": Mist
    };

    const defaultImagePath = Cloud;
    const weatherMain = Object.keys(result).length > 0 && result?.weather[0]?.main;
    const imagePath = weatherToImagePath[weatherMain] || defaultImagePath;



    return (
        <div className=" bg-white bg-opacity-90 rounded-md px-4 overflow-hidden">
            <div className="flex items-center text-blue-500 text-xl font-semibold py-4">
                <div className="cursor-pointer" onClick={() => navigate(-1)}>
                    <BsArrowLeftShort className="w-8 h-8 bg-blue-600 text-white mr-2 rounded-full" />
                </div>
                <h1 className='drop-shadow-md'>Weather Info</h1>
            </div>
            <hr className="border-gray-400" />

            {result && Object.keys(result).length > 0 ? (
                <div className=''>
                    <div className="flex flex-col justify-center items-center gap-2 py-6">
                        <img src={result && imagePath} alt="Weather Image" className="object-contain w-28 h-20" />

                        <div className="flex text-4xl">
                            <h2>{Math.round(result.main.temp)}</h2>
                            <h2 className="ml-1">°C</h2>
                        </div>

                        <p className="text-lg">{result.weather[0].main}</p>

                        <p className="flex items-center">
                            <ImLocation className="mr-1" />
                            {result.name}, {result.sys.country}
                        </p>
                    </div>

                    <div className="flex justify-between px-4 border-t border-gray-400 py-2">
                        <div className="flex items-center pr-5">
                            <BsThermometerSun className="w-7 h-7 text-blue-400" />
                            <div className="pl-2">
                                <div className="flex items-center">
                                    <h3 className="text-xl">{result.main.feels_like}</h3>
                                    <h3 className="ml-1">°C</h3>
                                </div>
                                <p>Feels like</p>
                            </div>
                        </div>

                        <div className="flex items-center pl-5 border-l border-black">
                            <WiHumidity className="w-9 h-9 text-blue-400" />
                            <div className="pl-2">
                                <div className="flex items-center">
                                    <h3 className="text-xl">{result.main.humidity}</h3>
                                    <h3 className="ml-1">%</h3>
                                </div>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center h-72 w-72 animate-pulse">
                    <img src={animagif} alt="" srcset="" />
                    {/* <p className="text-lg">Write City name to find Weather report</p> */}
                </div>
            )}
            {/* <div className='absolute overflow-hidden top-0 left-80 w-[950px]' >
                <div style={{ width: '400px' }}>
                    <GlobeComponent
                        specificLocation={result?.coord}
                        width="50%"
                        height="40px"
                    />
                </div>
            </div> */}
        </div>
    )
}

export default WeatherReport