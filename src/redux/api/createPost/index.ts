import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    postPostCreate: build.mutation<Post.PostCreateRes, Post.PostCreateReq>({
      query: (data) => ({
        url: "/post/post_create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    postContent: build.mutation<Post.GetPostImgRes, Post.GetPostImgReq>({
      query: (data) => ({
        url: "/post/post_img/create/",
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

    getPostDetail: build.query<Post.DetailPostRes, Post.DetailPostReq>({
      query: (id) => ({
        url: `/post/post_detail/${id}/`,
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
  useGetPostDetailQuery,
} = api;
