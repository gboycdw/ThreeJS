import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>메인페이지 입니다.</div>
      <button
        onClick={() => {
          navigate("/test");
        }}
      >
        테스트 페이지로
      </button>
    </div>
  );
}
export default MainPage;
