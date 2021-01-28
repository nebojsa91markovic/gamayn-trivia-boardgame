import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreateGame from "./Components/CreateGame";
import GameRoom from "./Components/GameRoom";
import NavBar from "./Components/NavBar";
import { useDisclosure } from "@chakra-ui/react";
import HowToPlay from "./Components/HowToPlay";

const App = () => {

  // How to play modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Router>
      <HowToPlay isOpen={isOpen} onClose={onClose} />
      <Switch>

        <Route exact path="/">
          <NavBar onOpen={onOpen} />
          <LandingPage />
        </Route>
        <Route exact path="/create">
          <NavBar onOpen={onOpen} />
          <CreateGame />
        </Route>
        <Route exact path="/game/:roomId">
          <NavBar onOpen={onOpen} />
          <GameRoom />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
