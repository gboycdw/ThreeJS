import type { QueryClient } from "@tanstack/query-core";
import { LoaderFunctionArgs } from "react-router-dom";

export const action =
  (queryClient: QueryClient) => async (params: LoaderFunctionArgs) => {
    console.log(queryClient);
    console.log(params);
    console.log("여긴액션");
    return "new Promise(() => {})";

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
