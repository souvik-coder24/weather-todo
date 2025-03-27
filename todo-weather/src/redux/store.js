import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import authReducer from "./authSlice";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
    weather: weatherReducer,
  },
});