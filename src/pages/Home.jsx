/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import SideBar from './layout/SideBar'
import { useEffect } from 'react';
import useWeatherStore from '../app/stores/WeatherStore';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../app/stores/utility/const';
import axios from 'axios';

import MainBody from './layout/MainBody';

const Home = () => {

    const { setCurrentWeather, setForecast, lat, setLat, lon, setLon, weatherDetails, setWeatherDetails } = useWeatherStore();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
        axios.get(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
            .then((response) => setCurrentWeather(response.data))
            .catch(console.log);

        axios.get(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
            .then((response) => setForecast(response.data))
            .catch(console.log);

        fetchData();
    }, [])

    const fetchData = async () => {
        const fetchWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,surface_pressure,windspeed_180m,winddirection_180m,temperature_180m,soil_temperature_54cm,soil_moisture_27_81cm,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=GMT`
        );
        const data = await fetchWeather.json();
        setWeatherDetails(data);
    }

    return (
        <div className=' mb-5 space-y-4'>
            <SideBar />
            <MainBody />
        </div>
    )
}

export default Home