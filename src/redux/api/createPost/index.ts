import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    postPostCreate: build.mutation<Post.PostCreateRes, Post.PostCreateReq>({
      query: (data) => ({
        ur: "/post/post_create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const { usePostPostCreateMutation } = api;
