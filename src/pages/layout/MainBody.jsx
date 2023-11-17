import React from 'react'
import Forecast from '../../components/Forecast'
import AreaChartCard from '../../components/AreaChartCard'
import LineChartCard from '../../components/LineChartCard'
import useWeatherStore from '../../app/stores/WeatherStore'
import { useEffect } from 'react'
import { useState } from 'react'

const MainBody = () => {

    const { currentWeather, forecast, weatherDetails,selectedCity,selectedCountry,findWeatherDetails } = useWeatherStore();

    const date = new Date(); // Creating a Date object for May 10, 2020
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const formattedDate = date.toLocaleDateString('en-US', options);

    const [currentTime, setCurrentTime] = useState(getFormattedTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

    function getFormattedTime() {
        const currentTime = new Date();
        const options = { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return currentTime.toLocaleTimeString('en-US', options);
    }

    // console.log("weatherDetails",weatherDetails)

    return (
        <div>

            <div class=" flex items-center justify-center mb-5">
                <div className="flex flex-col bg-gray-800 text-white rounded p-4 w-full ">
                    <div className='flex justify-between'>
                        <div>
                            <div className="font-bold text-xl">
                                {selectedCity?.label && findWeatherDetails? `${selectedCity?.label},${selectedCountry?.label}`: currentWeather?.name}
                            </div>
                            <div className="text-sm text-gray-500">{formattedDate}</div>
                            <div className="text-sm text-gray-500">{currentTime}</div>
                        </div>
                        <div>
                            <div>Feels like</div>
                            <div className="text-sm text-gray-500 text-center">{Math.round(currentWeather?.main?.feels_like)}°C</div>
                        </div>
                    </div>

                    <div className="mt-2 text-4xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                     
                        {currentWeather?.weather[0]?.icon ? <img
                            src={`icons/${currentWeather?.weather[0]?.icon}.png`}
                            className="w=32 h-28"
                            alt="weather"
                        />: 
                        <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                        }
                    </div>
                    <div className="flex flex-row items-center justify-center mt-2">
                        <div className="font-medium text-6xl">{Math.round(currentWeather?.main?.temp)}°</div>
                        <div className="flex flex-col items-center ml-6">
                            <div>{currentWeather?.weather[0]?.main}</div>
                            <div className="mt-1">
                                <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                                <span className="text-sm font-light text-gray-500">{Math.round(currentWeather?.main?.temp_max)}°C</span>
                            </div>
                            <div>
                                <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                                <span className="text-sm font-light text-gray-500">{Math.round(currentWeather?.main?.temp_min)}°C</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-2">
                        <div className="flex flex-col items-center">
                            <div className="font-medium text-sm">Wind</div>
                            <div className="text-sm text-gray-500">9k/h</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-medium text-sm">Humidity</div>
                            <div className="text-sm text-gray-500">{currentWeather?.main?.humidity}%</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-medium text-sm">Visibility</div>
                            <div className="text-sm text-gray-500">10km</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className=" h-screen">
                {/* <div className="flex justify-between flex-wrap gap-y-4">
                    <CommonCard title={"Temperature"} temperature={Math.round(currentWeather?.main?.temp)} />
                    <CommonCard title={"Max Temperature"} temperature={weatherDetails?.daily?.apparent_temperature_max[0]} />
                    <CommonCard title={"Mix Temperature"} temperature={weatherDetails?.daily?.apparent_temperature_min[0]} />
                </div> */}


                {/* Charts */}
                <div className="mt-5">
                    <Forecast data={forecast} />
                    <AreaChartCard weatherDetails={weatherDetails} />
                    <LineChartCard weatherDetails={weatherDetails} />
                </div>
            </div>
        </div>
    )
}

export default MainBody