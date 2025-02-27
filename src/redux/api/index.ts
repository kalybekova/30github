import {
  createApi,
  BaseQueryFn,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const tokens = localStorage.getItem("tokens");

    if (tokens) {
      const { access, refresh, expiration } = JSON.parse(tokens);
      const currentTime = Date.now();

      if (expiration && currentTime > expiration) {
        localStorage.clear();
      } else if (access) {
        headers.set("Authorization", `Bearer ${access}`);
      }
    }

    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const res = await baseQuery(args, api, extraOptions);

  // Если есть ошибка авторизации (например, токен не действителен), очищаем localStorage
  if (res.error?.status === 401) {
    localStorage.clear();
  }

  return res;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,

  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["auth", "post"],
  endpoints: () => ({}),
});
