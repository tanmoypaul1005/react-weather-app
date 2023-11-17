import { create } from "zustand";
import useUtilityStore from "./utilityStore";
import axios from "axios";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../utility/const";

const { setLoading } = useUtilityStore.getState()

const useWeatherStore = create((set) => ({

    lat: 23.81093000,
    setLat: (value) => set({ lat: value }),

    lon: 90.38540000,
    setLon: (value) => set({ lon: value }),

    findWeatherDetails: false,
    setFindWeatherDetails: (value) => set({ findWeatherDetails: value }),

    currentWeather: null,
    setCurrentWeather: (value) => set({ currentWeather: value }),

    forecast: null,
    setForecast: (value) => set({ forecast: value }),

    allCountries: [],
    setAllCountries: (value) => set({ allCountries: value }),

    selectedCountry: "",
    setSelectedCountry: (value) => set({ selectedCountry: value }),

    selectedCity: "",
    setSelectedCity: (value) => set({ selectedCity: value }),

    weatherDetails: [],
    setWeatherDetails: (value) => set({ weatherDetails: value }),
}));

export default useWeatherStore;

export const getCurrentWeather = async () => {

    const { selectedCity, lat, lon, setCurrentWeather } = useWeatherStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(`${WEATHER_API_URL}/weather?lat=${selectedCity?.value?.latitude ?? lat}&lon=${selectedCity?.value?.longitude ?? lon}&appid=${WEATHER_API_KEY}&units=metric`)
        console.log("getCurrentWeather res.data:::: ", res);

        if (res?.status) {
            setCurrentWeather(res?.data)
        }

        setLoading(false);

    } catch (error) {
        console.log("getCurrentWeather: ", error);
        setLoading(false);
        return false;
    }
};

export const getForecast = async () => {

    const {selectedCity, setForecast, lat, lon } = useWeatherStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(`${WEATHER_API_URL}/forecast?lat=${selectedCity?.value?.latitude ?? lat}&lon=${selectedCity?.value?.longitude ?? lon}&appid=${WEATHER_API_KEY}&units=metric`);
        console.log("getForecast res.data:::: ", res?.data);

        if (res?.status) {
            setForecast(res?.data)
        }

        setLoading(false);

    } catch (error) {
        console.log("getForecast: ", error);
        setLoading(false);
        return false;
    }
};

export const getFetchWeather = async () => {

    const {selectedCity, setWeatherDetails, lat, lon } = useWeatherStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity?.value?.latitude ?? lat}&longitude=${selectedCity?.value?.longitude ?? lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,surface_pressure,windspeed_180m,winddirection_180m,temperature_180m,soil_temperature_54cm,soil_moisture_27_81cm,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=GMT`);
        console.log("getFetchWeather res.data:::: ", res?.data);

        if (res?.status) {
            setWeatherDetails(res?.data)
        }

        setLoading(false);

    } catch (error) {
        console.log("getFetchWeather: ", error);
        setLoading(false);
        return false;
    }
};

