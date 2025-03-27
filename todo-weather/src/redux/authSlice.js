import { createSlice } from "@reduxjs/toolkit";

//Load user from local storage if available
const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: loadUserFromStorage() }, //Load user from local storage
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); //Save user to local storage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); //Remove user from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;