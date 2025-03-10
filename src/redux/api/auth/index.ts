import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<Auth.LogInRes, Auth.LogInReq>({
      query: (data) => ({
        url: `/user/login/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    register: build.mutation<Auth.RegisterRes, Auth.RegistenReq>({
      query: (data) => ({
        url: `/user/register/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    logOut: build.mutation({
      query: (data) => ({
        url: `/user/logout/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLogInMutation, useRegisterMutation, useLogOutMutation } = api;
