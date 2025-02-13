import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    postPostCreate: build.mutation<Post.PostCreateRes, FormData>({
      query: (data) => ({
        url: "/post/post_create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const { usePostPostCreateMutation } = api;
