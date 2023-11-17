/* eslint-disable react-hooks/exhaustive-deps */
import Select from "react-select";
import React from 'react'
import { useEffect } from 'react';
import { City, Country } from "country-state-city";
import useWeatherStore, { getCurrentWeather, getFetchWeather, getForecast } from '../../app/stores/WeatherStore';


const TopBar = () => {

    const { allCountries, setAllCountries, selectedCountry, setSelectedCountry,selectedCity, setSelectedCity } = useWeatherStore();

    useEffect(() => {
        setAllCountries(
            Country.getAllCountries().map((country) => ({
                value: {
                    name: country.name,
                    latitude: country.latitude,
                    longitude: country.longitude,
                    isoCode: country.isoCode,
                },
                label: country.name,
            }))
        );
    }, []);

    const handleSelectedCountry = (option) => {
        setSelectedCountry(option);
        setSelectedCity(null);
    };

    const handleSelectedCity = (option) => {
        setSelectedCity(option);
    };

    const getWeatherDetails = async (e) => {
        e.preventDefault();
        getFetchWeather();
        getCurrentWeather();
        getForecast();
    };

    return (
        <div>
            <div className="flex flex-col space-y-10 bg-blue-950 h-full  p-4 ">
                {/* Select country and city */}
                <div className="flex flex-row justify-center space-x-5">
                    <div className='w-full'>
                        <Select
                            placeholder="Select Country"
                            options={allCountries}
                            value={selectedCountry}
                            onChange={handleSelectedCountry}
                        />
                    </div>

                    <div className='w-full'>

                        <Select
                            placeholder="Select Area"
                            options={City.getCitiesOfCountry(
                                selectedCountry?.value?.isoCode
                            ).map((city) => ({
                                value: {
                                    latitude: city.latitude,
                                    longitude: city.longitude,
                                    name: city.name,
                                },
                                label: city.name,
                            }))}
                            value={selectedCity}
                            onChange={handleSelectedCity}
                        />
                    </div>
                    <button
                        onClick={getWeatherDetails}
                        className="bg-green-400 w-full py-2 rounded-md text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
    >
                        Get Weather
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopBar