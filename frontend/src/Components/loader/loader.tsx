import axios from "axios";

const DB = "http://gamezone.gomao9.com:8080/api/categories";

const axiosGetData = async () => {
  const data = axios.get(DB);
  return data;
};

const query = {
  queryKey: ["gomao"],
  queryFn: axiosGetData,
  cacheTime: 9999,
  staleTime: 9999,
};

export const loader =
  (queryClient: any) =>
  async ({ request }: any) => {
    console.log(queryClient);
    console.log(request);

    const before = queryClient.getQueryData(query.queryKey);

    if (before) {
      console.log("ㅇㅇ");
      return before.data;
    }
    console.log("여기 옴?");
    const { data } = await queryClient.fetchQuery(query);
    return data ? data : "gomao";
  };
