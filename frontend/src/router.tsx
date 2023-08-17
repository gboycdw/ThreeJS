import React from "react";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import MovingCubic from "./Components/Render/MovingCubic";
import MovingCubic2 from "./Components/Render/MovingCubic2";
import Chat from "./Components/Chat/chat";
import Join from "./Components/Chat/join";
import JoinPage from "./Pages/JoinPage";
import checker from "./Components/loader/checker";
import checker2 from "./Components/loader/checker2";
import { QueryClient } from "@tanstack/react-query";
import { loader } from "./Components/loader/loader";
export const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/test1",
    element: <MovingCubic />,
    action: checker2,
    loader: loader(queryClient),
  },
  {
    path: "/test2",
    element: <MovingCubic2 />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/gomao/*",
    element: <JoinPage />,
  },
]);
