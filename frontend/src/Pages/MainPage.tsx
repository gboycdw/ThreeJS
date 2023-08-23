import { useState, useEffect } from 'react';
import { queryClient } from '../router';
import { query } from '../Components/loader/loader';
import MainButton from '../Components/Common/Button';
import '../App.css';
import { useQuery } from '@tanstack/react-query';
function MainPage() {
  const bef = useQuery(query);
  console.log(bef.data?.data);
  // const before = queryClient.getQueryData(query.queryKey);
  // const [before, setBefore] = useState(queryClient.getQueryData(query.queryKey));
  // const [dd, setDd] = useState<any>(() => {
  //   if (before && 'data' in (before as Record<string, unknown>)) {
  //     (before as Record<string, unknown>).data;
  //   }
  // });
  // useEffect(() => {
  //   if (before && 'data' in (before as Record<string, unknown>)) {
  //     setDd((before as Record<string, unknown>).data);
  //   } else {
  //     setDd(null);
  //   }
  // }, [before, dd]);

  const buttonPath = ['/test1', '/test2', '/join', '/gomao'];
  const buttonMsg = ['three.js Cubic 테스트', 'React Three Fiber 테스트', 'Websoket 테스트', '통합 테스트'];
  const buttonStyle = 'p-3 m-2 border-2 border-black bg-slate-300 rounded-lg w-35 h-35';
  return (
    <div className="m-20 grid space-y-3">
      <div className="justify-self-center">메인페이지 입니다.</div>
      <div className="flex space-x-10 justify-self-center">
        {buttonPath.map((route: string, i: number) => {
          return (
            <MainButton key={route} route={route} style={buttonStyle}>
              {buttonMsg[i]}
            </MainButton>
          );
        })}
      </div>
      <div className="ml-9 w-fit content-center justify-self-center rounded-lg border-2 bg-slate-100">
        <div>react-query 테스트 string</div>
        {bef.data?.data && <div>{Object.values(bef.data.data).map((a: any) => a.categoryName)}</div>}
        {/* <div>{typeof dd === 'object' && dd && Object.values(dd).map((a: any) => a.categoryName)}</div> */}
      </div>
    </div>
  );
}
export default MainPage;
