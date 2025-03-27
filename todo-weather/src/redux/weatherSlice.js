import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "a53d74bc8d434701a1e130001252603";
const API_URL = "https://api.weatherapi.com/v1/current.json";

//Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch weather data");
      }

      //Extract and format time to HH:MM AM/PM
      const rawTime = data.location.localtime.split(" ")[1]; // Extract time part
      const [hour, minute] = rawTime.split(":");
      const formattedTime = new Date(0, 0, 0, hour, minute)
        .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

      return {
        city: data.location.name,
        country: data.location.country,
        weather: data.current.condition.text.toLowerCase(),
        temperature: data.current.temp_c,
        windSpeed: `${data.current.wind_kph} km/h`,
        humidity: `${data.current.humidity}%`,
        isNight: data.current.is_day === 0, //Detect night time
        localTime: formattedTime, //Store formatted time
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "Unknown",
    country: "",
    weather: "sunny",
    temperature: 25,
    windSpeed: "15 km/h",
    humidity: "60%",
    isNight: false,
    localTime: "12:00 AM",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        return { ...state, ...action.payload, error: null };
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;