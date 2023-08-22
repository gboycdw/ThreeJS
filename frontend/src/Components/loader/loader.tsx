import axios, { AxiosPromise } from "axios";
import type { QueryClient } from "@tanstack/query-core";
import { LoaderFunctionArgs } from "react-router-dom";

const DB = "http://gamezone.gomao9.com:8080/api/categories";

const axiosGetData: () => AxiosPromise = async () => {
  const data = axios.get(DB);
  return data;
};

interface queryType {
  queryKey: string[];
  queryFn: () => AxiosPromise;
  [key: string]: string[] | (() => AxiosPromise) | number | boolean;
}
export const query: queryType = {
  queryKey: ["gomao"],
  queryFn: axiosGetData,
  cacheTime: 100000,
  staleTime: 30000,
};

export const loader =
  (queryClient: QueryClient) => async (params: LoaderFunctionArgs) => {
    console.log(queryClient);
    console.log(params);
    try {
      const { data } = await queryClient.ensureQueryData(query);
      return data;
    } catch (e) {
      console.log("에러임 ㅎㅎ : ", e);
      throw new Error("ㅇㅇ");
    }

    // // 구버전
    // const before: unknown = queryClient.getQueryData(query.queryKey);
    // if (before && "data" in (before as Record<string, unknown>)) {
    //   console.log("신선한 데이터가 이미있음ㅎ");

    //   return (before as Record<string, unknown>).data;
    // } else {
    //   console.log("데이터가 없거나 낡았음");
    //   const { data } = await queryClient.fetchQuery(query);
    //   return data ? data : "gomao";
    // }
  };
