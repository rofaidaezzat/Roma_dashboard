import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  admin: any | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("roma_token") || null,
  admin: localStorage.getItem("roma_admin") ? JSON.parse(localStorage.getItem("roma_admin") as string) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; admin: any }>
    ) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      localStorage.setItem("roma_token", action.payload.token);
      localStorage.setItem("roma_admin", JSON.stringify(action.payload.admin));
    },
    logout: (state) => {
      state.token = null;
      state.admin = null;
      localStorage.removeItem("roma_token");
      localStorage.removeItem("roma_admin");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
