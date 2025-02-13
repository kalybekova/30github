import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    UserById: build.query<Post.UserByIdRes, Post.UserByIdReq>({
      query: (id) => ({
        url: `/user/profile/${id}/`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    postPostCreate: build.mutation<Post.PostCreateRes, FormData>({
      query: (data) => ({
        url: "/post/post_create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    postContent: build.mutation({
      query: (data) => ({
        url: "/post/content_create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    getAllPost: build.query<Post.GetPostRes, Post.GetPostReq>({
      query: () => ({
        url: "/post/post_list",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
  }),
});

export const {
  usePostPostCreateMutation,
  useGetAllPostQuery,
  usePostContentMutation,
  useUserByIdQuery,
} = api;
