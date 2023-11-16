/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Select from "react-select";
import React from 'react'
import { useEffect } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../app/stores/utility/const';
import { City, Country } from "country-state-city";
import useWeatherStore from '../../app/stores/WeatherStore';
import WeatherCard from '../../components/WeatherCard';

const SideBar = () => {

    const { currentWeather, setCurrentWeather, setForecast, allCountries, setAllCountries, selectedCountry, setSelectedCountry
        , lat, lon, selectedCity, setSelectedCity, setWeatherDetails } = useWeatherStore();

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
        const fetchWeather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.value.latitude ?? lat}&longitude=${selectedCity.value.longitude ?? lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,surface_pressure,windspeed_180m,winddirection_180m,temperature_180m,soil_temperature_54cm,soil_moisture_27_81cm,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=GMT`
        );
        const data = await fetchWeather.json();
        setWeatherDetails(data);
        axios.get(`${WEATHER_API_URL}/weather?lat=${selectedCity.value.latitude ?? lat}&lon=${selectedCity.value.longitude ?? lon}&appid=${WEATHER_API_KEY}&units=metric`)
            .then((response) => setCurrentWeather(response.data))
            .catch(console.log);

        axios.get(`${WEATHER_API_URL}/forecast?lat=${selectedCity.value.latitude ?? lat}&lon=${selectedCity.value.longitude ?? lon}&appid=${WEATHER_API_KEY}&units=metric`)
            .then((response) => setForecast(response.data))
            .catch(console.log);
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
                        className="bg-green-400 w-full py-3 rounded-lg text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
                    >
                        Get Weather
                    </button>
                </div>

                {/* <WeatherCard data={currentWeather} /> */}
            </div>
        </div>
    )
}

export default SideBar