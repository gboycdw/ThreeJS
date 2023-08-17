import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import MovingCubic from "./Components/Render/MovingCubic";
import MovingCubic2 from "./Components/Render/MovingCubic2";
import Chat from "./Components/Chat/chat";
import Join from "./Components/Chat/join";
import JoinPage from "./Pages/JoinPage";
import { RecoilRoot } from "recoil";
import { router, queryClient } from "./router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

/* <BrowserRouter>
        <Routes>
          <Route path="/test1" element={<MovingCubic />} />
          <Route path="/test2" element={<MovingCubic2 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/join" element={<Join />} />
          <Route path="/gomao/*" element={<JoinPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter> */
