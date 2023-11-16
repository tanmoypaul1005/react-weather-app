/* eslint-disable react-hooks/exhaustive-deps */
import { City, Country } from "country-state-city";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Card, Metric, Text } from "@tremor/react";
import AreaChartCard from "../components/AreaChartCard";
import LineChartCard from "../components/LineChartCard";
import moment from "moment/moment";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../app/stores/utility/const";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import CommonCard from "../components/card/CommonCard";

function Sidebar() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  const [weatherDetails, setWeatherDetails] = useState([]);

  const [lat, setLat] = useState(23.81093000);
  const [lon, setLon] = useState(90.38540000);

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

  // console.log(weatherDetails);
  // console.log("forecast",forecast);
  // console.log("currentWeather", currentWeather)

  // console.log("selectedCity.value.latitude",selectedCity?.value?.latitude)
  // console.log("selectedCity.value.longitude",selectedCity?.value?.longitude)

  return (
    <div className="max-w-7xl mx-auto flex space-x-1">
      {/* Sidebar Div */}
      <div className="flex flex-col space-y-10 bg-blue-950 h-screen w-[25%] p-2 rounded-md">
        {/* Select country and city */}
        <div className="flex flex-col justify-center space-y-5 min-w-sm">
          <select
            placeholder="Select Area"
            options={allCountries}
            value={selectedCountry}
            onChange={handleSelectedCountry}
          />

          <select
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

          <button
            onClick={getWeatherDetails}
            className="bg-green-400 w-full py-3 rounded-lg text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Get Weather
          </button>
        </div>

        <WeatherCard data={currentWeather} />

        {/* Day or Night */}
        {/* <div className="flex items-center space-x-5 text-white">
          <p>
            <WbSunnyIcon />
            {moment(
              new Date(weatherDetails?.daily?.sunrise[0]).getTime()
            ).format("LT")}
          </p>

          <p>
            <NightlightRoundIcon />
            {moment(
              new Date(weatherDetails?.daily?.sunset[0]).getTime()
            ).format("LT")}
          </p>
        </div> */}
      </div>

      {/* Body Div */}
      <div className="w-[75%] h-screen">
        <div className="flex items-center justify-evenly space-x-2 mt-2">
          <CommonCard title={"Max Temperature"} temperature={weatherDetails?.daily?.apparent_temperature_max[0]} />
          <CommonCard title={"Mix Temperature"} temperature={weatherDetails?.daily?.apparent_temperature_min[0]} />
          <CommonCard title={"Max Temperature"} temperature={weatherDetails?.daily?.winddirection_10m_dominant[0]} />

        </div>

        {/* Charts */}
        <div className="mt-5">
          <Forecast data={forecast} />
          <AreaChartCard weatherDetails={weatherDetails} />
          <LineChartCard weatherDetails={weatherDetails} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
