import { redirect } from "react-router-dom";
function checker(params: any) {
  console.log(params);
  const url = window.location.pathname;
  if (url !== "/") {
    return redirect("/");
  }
  console.log("경로확인OK");
  return <div>ㄱㅁㅇ</div>;
}

export default checker;
