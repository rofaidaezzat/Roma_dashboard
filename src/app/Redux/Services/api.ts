import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://by-roma.vercel.app",
    prepareHeaders: (headers, { getState }) => {
      // Bypass ngrok browser warning which can mistakenly cause CORS failure
      headers.set("ngrok-skip-browser-warning", "true");

      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Order", "Auth", "Request", "Stats"],
  endpoints: () => ({}),
});
