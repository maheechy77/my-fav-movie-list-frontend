import { createSlice } from "@reduxjs/toolkit";

interface State {
  access_token: string | null;
  username: string | null;
}

interface authState {
  auth: State;
}

let initialState: State = {
  access_token: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: any) => {
      const { username, access_token } = action.payload;
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", username);
      state.username = username;
      state.access_token = access_token;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      state.username = null;
      state.access_token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: authState) => state.auth.username;

export const selectToken = (state: authState) => state.auth.access_token;
