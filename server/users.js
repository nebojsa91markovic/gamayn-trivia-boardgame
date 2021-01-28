let users = [];

const addUser = ({ nickname, room, id }) => {
  nickname = nickname.trim().toLowerCase();
  //room = room.trim().toLowerCase();
  const userExists = users.filter(
    (u) => u.nickname === nickname && u.room === room
  );
  if (userExists.length > 0) {
    return {
      error: {
        type: "ERROR",
        msg: "The user with this nickname is already playing!",
      },
    };
  }
  if (getUsersInRoom(room).length === 4) {
    const roomIsFull =
      "Room already have four players. Wait for them to finish, or create your on game!";

    return { error: { type: "FULL_ROOM", msg: roomIsFull, nickname } };
  }
  const roomExists = users.filter((u) => u.room === room);
  const newUser = { nickname, room, id };
  if (roomExists.length > 0) {
    users.push(newUser);

    return { startGame: { type: "NEW_GAME", newUser } };
  }

  users.push(newUser);
  return { newUser };
};
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
const getOnlyUsersInRoom = (room) => {
  const arrayOfUsers = getUsersInRoom(room);
  const arrayOfNicknames = arrayOfUsers.map((user) => user.nickname);
  return arrayOfNicknames;
};
const getUser = (id) => users.find((user) => user.id === id);
module.exports = {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getOnlyUsersInRoom,
};
