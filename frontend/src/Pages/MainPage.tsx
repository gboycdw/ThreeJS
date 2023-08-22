import { useState, useEffect } from "react";
import { queryClient } from "../router";
import { query } from "../Components/loader/loader";
import MainButton from "../Components/Common/Button";
import "../App.css";
import { button } from "leva";

function MainPage() {
  const [before, setBefore] = useState<any>(
    queryClient.getQueryData(query.queryKey)
  );
  const [dd, setDd] = useState<any>(null);
  useEffect(() => {
    if (before && "data" in (before as Record<string, unknown>)) {
      setDd((before as Record<string, unknown>).data);
    }
    setBefore(queryClient.getQueryData(query.queryKey));
  }, [before]);

  const buttonPath = ["/test1", "/test2", "/join", "/gomao"];
  const buttonMsg = [
    "three.js Cubic 테스트",
    "React Three Fiber 테스트",
    "Websoket 테스트",
    "통합 테스트",
  ];

  return (
    <div className="space-y-3 m-20 grid">
      <div className="justify-self-center">메인페이지 입니다.</div>
      <div className="flex  space-x-10 justify-self-center">
        {buttonPath.map((route: string, i: number) => {
          return (
            <MainButton
              route={route}
              style="p-3 m-2 border-2 border-black bg-slate-300 rounded-lg w-35 h-35 "
            >
              {buttonMsg[i]}
            </MainButton>
          );
        })}
      </div>
      <div className="bg-slate-100 w-fit content-center text-center border-2 rounded-lg ml-9 justify-self-center">
        <div>react-query 테스트 string</div>
        <div>
          {typeof dd === "object" &&
            dd &&
            Object.values(dd).map((a: any) => a.categoryName)}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
