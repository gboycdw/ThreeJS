export interface User {
  id: string;
  name: string;
  room: string;
}

const defaultUser: User = {
  id: "who",
  name: "are",
  room: "you",
};

const users: User[] = [];

function addUser({ id, name, room }: User) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existUser = users.find(
    (user: User) => user.room === room && user.name === name
  );
  if (existUser) {
    return { error: "중복된 유저이름" };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
}

function removeUser(id: string) {
  const index = users.findIndex((user: User) => user.id === id);
  if (index !== -1) {
    console.log(`${id} 유저를 추방함`);
    return users.splice(index, 1);
  }
}

function getUser(id: string) {
  console.log(users);
  const user = users.find((user: User) => user.id === id);
  return user ? user : defaultUser;
}

function getUsersInRoom(room: string) {
  const usersInRoom = users.filter((user: User) => user.room === room);
  return { users: usersInRoom };
}

function allUser(room?: string) {
  return { users };
}

export { addUser, removeUser, getUser, getUsersInRoom, allUser };
