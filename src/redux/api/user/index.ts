import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    user: build.query<User.UserListRes, User.UserListReq>({
      query: () => ({
        url: `/user/profile/`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    UserById: build.query<User.UserByIdRes, User.UserByIdReq>({
      query: (id) => ({
        url: `/user/profile/${id}/`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    editProfile: build.mutation<User.EditRes, User.EditReq>({
      query: ({ data, id }) => ({
        url: `/user/updated/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useUserByIdQuery, useEditProfileMutation, useUserQuery } = api;
