import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles.css";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>메인페이지 입니다.</div>
      <div style={{ display: "grid" }}>
        <button
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "95px",
          }}
          onClick={() => {
            navigate("/test1");
          }}
        >
          three.js cubic 테스트 페이지로
        </button>
        <button
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "95px",
          }}
          onClick={() => {
            navigate("/test2");
          }}
        >
          React three Fiber 테스트 페이지로
        </button>
        <button
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "95px",
          }}
          onClick={() => {
            navigate("/join");
          }}
        >
          Websoket 테스트 페이지로
        </button>
        <button
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "95px",
          }}
          onClick={() => {
            navigate("/gomao");
          }}
        >
          통합 테스트 페이지로
        </button>
      </div>
    </div>
  );
}
export default MainPage;
