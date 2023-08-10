export interface User {
  id: string;
  name: string;
  room: string;
}

const defaultUser: User = {
  id: "undefined",
  name: "anonymous",
  room: "prison",
};

const users: User[] = [];

function addUser({ id, name, room }: User) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const index = users.findIndex(
    (user: User) => user.room === room && user.name === name
  );
  if (index !== -1) {
    return { error: "중복된 유저이름" };
  } else {
    const user = { id: id, name: name, room: room };
    users.push(user);
    console.log(
      "유저수",
      users.length,
      users.map((a) => a.name)
    );
    return { user: user };
  }
}

function removeUser(name: string) {
  const index = users.findIndex((user: User) => user.name === name);
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
  return { usersInRoom };
}

function changeUserName(name: string, newname: string) {
  const index = users.findIndex((user: User) => user.name === name);
  if (index !== -1) {
    // 기존 닉네임 검색결과, 해당 유저가 있으면
    const checker = users.find((user: User) => user.name === newname);
    if (checker) {
      console.log("이미 있는 닉네임");
      return [];
    } else {
      users[index].name = newname; // 중복이 없으면 해당 유저의 이름을 새로 지정한다.
      return [name, newname];
    }
  } else {
    console.log("해당 유저를 찾을 수 없음");
    return [];
  }
}

export { addUser, removeUser, getUser, getUsersInRoom, changeUserName };
