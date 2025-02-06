import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation({
      query: (data) => ({
        url: ``,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLogInMutation } = api;
