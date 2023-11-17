/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react';
import useWeatherStore, { getCurrentWeather, getFetchWeather, getForecast } from '../app/stores/WeatherStore';
import MainBody from './layout/MainBody';
import TopBar from './layout/TopBar';

const Home = () => {

    const {  setLat, setLon,lat,lon } = useWeatherStore();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
        getCurrentWeather();
        getForecast();
        getFetchWeather();
    }, [])

    useEffect(() => {
        getCurrentWeather();
        getForecast();
        getFetchWeather();
    }, [lat,lon])

    return (
        <div className='mb-5 space-y-4'>
            <TopBar />
            <MainBody />
        </div>
    )
}

export default Home