export {};
// import { redirect } from "react-router-dom";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

// const DB = "http://gamezone.gomao9.com:8080/api/categories";

// const queryFn = () => ({
//   queryKey: ["gomao"],
//   queryFn: async () => {
//     const { data } = await axios.get(DB);
//   },
// });

// async function checker(data: any) {
//   axios.get(DB).then((res) => {
//     console.log("출력테스트", res.data);
//   });

//   const axiosGetData = () => {
//     axios.get(DB).then((res) => {
//       console.log("출력테스트2", res.data);
//     });
//   };

//   // const { isLoading, isError, data, error } = useQuery(
//   //   ["todos"], // Unique Key, React-Query v4로 넘어오며 반드시 Array에 담아야 함.
//   //   axiosGetData, // 비동기 함수
//   //   {
//   //     refetchOnWindowFocus: false,
//   //     retry: 0, // 실패 시 재실행 횟수
//   //   } // Options 객체
//   // );
//   //   console.log(params.request.url);
//   const url = window.location.pathname;
//   if (url !== "/") {
//     console.log("메인페이지에서 직접드가셈");
//     return redirect("/");
//   }

//   console.log("확인OK");
//   axiosGetData();
//   return data;
// }

// export default checker;
