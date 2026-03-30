import { api } from "./api";

interface UserResponse {
  status: string;
  code: number;
  message: string;
  data: {
    admin: any;
    token: string;
  };
}

export interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  brandDescription: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    website: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface GetMeResponse {
  status: string;
  code: number;
  message: string;
  data: AdminProfile;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, any>({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation<any, { currentPassword: string; newPassword: string }>({
      query: (body) => ({
        url: "/api/v1/auth/update-password",
        method: "PATCH",
        body,
      }),
    }),
    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/v1/auth/update-profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<GetMeResponse, void>({
      query: () => "/api/v1/auth/get-me",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useUpdatePasswordMutation, useUpdateProfileMutation, useGetMeQuery } = authApi;
