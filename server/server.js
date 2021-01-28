const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getOnlyUsersInRoom,
} = require("./users.js");

const { ADD_QUESTIONS, singleQA } = require("./questions.js");

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  socket.emit("welcome");
  socket.on("create_game", ({ nickname, room }, callback) => {
    const payload = {
      nickname,
      room,
      id: socket.id,
    };

    const { newUser, error, startGame } = addUser(payload);

    if (error) {
      return callback(error);
    } else if (startGame) {
      socket.join(startGame.newUser.room);

      io.to(startGame.newUser.room).emit("usoJeDrugiIgrac", {
        msg: "uso je drugi igrac",
        nickname: startGame.newUser.nickname,
        users: getOnlyUsersInRoom(startGame.newUser.room),
      });

      return callback(startGame);
    } else {
      socket.join(newUser.room);
      socket.emit("message", {
        user: "Admin",
        message: `Welcome to some room!, cekaj drugara da udje`,
      });
    }
  });

  socket.on("sendQuestionsToServer", ({ questions }) => {
    ADD_QUESTIONS(questions);
  });

  socket.on("getSingle", ({ category, diff, players }) => {
    const singleQ = singleQA(category, diff);
    const user = getUser(socket.id);
    const answers = singleQ.randomAnswers;
    io.to(user.room).emit("respondSingleQA", {
      singleQ: singleQ.single,
      prevStatePlayers: { ...players, currentQuestion: singleQ.single },
      answers: singleQ.randomAnswers,
    });
  });

  socket.on("my_message", ({ message }) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, message });
  });

  socket.on("newMessage", ({ message }) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("newMessageRecived", {
      user: user.nickname,
      message,
    });
  });

  socket.on("gameStarting", ({ msg }) => {
    const user = getUser(socket.id);
    const users = getUsersInRoom(user.room);
    io.to(user.room).emit("youCanStart", { users });
  });

  socket.on("updatePlayersState", ({ players }) => {
    const user = getUser(socket.id);
    const users = getUsersInRoom(user.room);
    io.to(user.room).emit("updatedState", { players });
  });

  socket.on("updateCurrentPlayer", ({ newPlayer }) => {
    const user = getUser(socket.id);
    const users = getUsersInRoom(user.room);
    io.to(user.room).emit("currentPlayerUpdated", { newPlayer });
  });

  socket.on("opponentsQuestion", ({ question }) => {
    const user = getUser(socket.id);
    const users = getUsersInRoom(user.room);
    io.to(user.room).emit("opponentsQuestionRespond", { question });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });

  socket.on("updatePlayer", ({ players, currentPlayer }) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("updatePlayer", {
      user: user.name,
      players,
      currentPlayer,
    });
  });
});

server.listen(PORT, () => console.log(`listening to port ${PORT}`));
