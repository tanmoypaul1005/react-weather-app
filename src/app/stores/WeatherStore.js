import { create }from "zustand";

const useWeatherStore = create((set) => ({

    lat: 23.81093000,
    setLat: (value) => set({ lat: value }),

    lon: 90.38540000,
    setLon: (value) => set({ lon: value }),

 
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