import { v4 } from "uuid";

export interface User {
  id: string;
  name: string;
  room: string;
}

const defaultUser: User = {
  id: "dikfjalksdfjlk",
  name: "anonymous",
  room: "prison",
};

const users: User[] = [];

function addUser({ name, room }: User) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const uid = v4();
  const existUser = users.find(
    (user: User) => user.room === room && user.name === name
  );
  if (existUser) {
    return { error: "중복된 유저이름" };
  }
  const user = { id: uid, name, room };
  users.push(user);
  return { user };
}

function removeUser(name: string) {
  const index = users.findIndex((user: User) => user.name === name);
  console.log(index);
  if (index !== -1) {
    console.log(`${users[index].name} 유저가 떠남`);
    return users.splice(index, 1)[0];
  }
}

function getUser(name: string) {
  const user = users.find((user: User) => user.name === name);
  return user ? user : defaultUser;
}

function getUsersInRoom(room: string) {
  const usersInRoom = users.filter((user: User) => user.room === room);
  return { users: usersInRoom };
}

function changeUserName(name: string, newname: string) {
  const index = users.findIndex((user: User) => user.name === name);
  if (index !== -1) {
    users[index].name = newname;
  }
  return [name, newname];
}

export { addUser, removeUser, getUser, getUsersInRoom, changeUserName };
