import React from "react";
import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface MessageType {
  user: string;
  text: string;
}

// 어빌리티 상태관리
export const messageState = atom<any[]>({
  key: "messageState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
