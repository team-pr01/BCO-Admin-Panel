/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const businessListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessList: builder.query({
      query: () => ({
        url: `/business-list`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["businessList"],
    }),

    getSingleBusiness: builder.query({
      query: (id) => ({
        url: `/business-list/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["businessList"],
    }),

    addBusiness: builder.mutation<any, any>({
      query: (data) => ({
        url: `/business-list/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["businessList"],
    }),

    deleteBusiness: builder.mutation<any, string>({
      query: (id) => ({
        url: `/business-list/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["businessList"],
    }),

    updateBusiness: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/business-list/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["businessList"],
    }),

    approveBusiness: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/business-list/update-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["businessList"],
    }),
  }),
});

export const {
  useGetAllBusinessListQuery,
  useGetSingleBusinessQuery,
  useAddBusinessMutation,
  useDeleteBusinessMutation,
  useUpdateBusinessMutation,
  useApproveBusinessMutation,
} = businessListApi;
