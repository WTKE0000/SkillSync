import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? {},
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      console.log("Logging in with user data:", action.payload);
      state.user = action.payload; // Ensure user is set correctly
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export default userSlice.reducer;

export function Login(user) {
  return (dispatch) => {
    const userData = { token: user.token, ...user }; // Ensure correct structure
    localStorage.setItem("userInfo", JSON.stringify(userData));
    dispatch(userSlice.actions.login(userData)); // Dispatch with the entire userData
  };
}

export function Logout() {
  return (dispatch) => {
    dispatch(userSlice.actions.logout());
  };
}