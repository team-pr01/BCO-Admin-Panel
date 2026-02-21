/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const consultancyServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlConsultancyServices: builder.query({
      query: ({ keyword, category }) => ({
        url: `/consultancy-service`,
        method: "GET",
        credentials: "include",
        params: {
          keyword,
          category,
        },
      }),
      providesTags: ["consultancyService"],
    }),

    getSingleConsultancyService: builder.query({
      query: (id) => ({
        url: `/consultancy-service/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["consultancyService"],
    }),

    addConsultancyService: builder.mutation<any, any>({
      query: (data) => ({
        url: `/consultancy-service/add-consultancy-service`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultancyService"],
    }),

    deleteConsultancyService: builder.mutation<any, string>({
      query: (id) => ({
        url: `/consultancy-service/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["consultancyService"],
    }),

    updateConsultancyService: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/consultancy-service/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultancyService"],
    }),
  }),
});

export const {
  useGetAlConsultancyServicesQuery,
  useGetSingleConsultancyServiceQuery,
  useAddConsultancyServiceMutation,
  useDeleteConsultancyServiceMutation,
  useUpdateConsultancyServiceMutation,
} = consultancyServiceApi;
