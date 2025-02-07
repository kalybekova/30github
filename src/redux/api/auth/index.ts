import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    user: build.query({
      query: () => ({
        url: ``,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    logIn: build.mutation({
      query: (data) => ({
        url: `/login/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLogInMutation } = api;
