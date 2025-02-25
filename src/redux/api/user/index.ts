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

    editProfile: build.mutation<Post.EditRes, Post.EditReq>({
      query: ({ data, id }) => ({
        url: `/user/updated/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useUserByIdQuery, useEditProfileMutation } = api;
