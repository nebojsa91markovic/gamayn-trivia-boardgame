import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ScoreboardStore from "../Store/ScoreboardStore";
import ScoreboardCollection from "../services/ScoreboardCollection";
import { ALL_DATA } from "../Reducer/scoreboardTypes";
import { v4 as uuidv4 } from "uuid";
import { Button, Flex, Heading, List, ListItem, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    let scoreboardData = [];
    ScoreboardCollection.orderBy("wins", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          scoreboardData.push(doc.data());
        });
      });
    ScoreboardStore.dispatch({
      type: ALL_DATA,
      payload: { allData: scoreboardData },
    });
  }, []);

  useEffect(() => {
    Modal.setAppElement("#scoreboard");
    setScoreboard(ScoreboardStore.getState());
  }, []);

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (

    <Flex id="scoreboard" >
      <button onClick={openModal}>Scoreboard</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Flex alignItems="space-between" w="100%">
          <Heading ref={(_subtitle) => (subtitle = _subtitle)} color="primary.800">Scoreboard</Heading>
          {/* <Button onClick={closeModal}>close</Button> */}
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Nickname</Th>
              <Th>Num of matche</Th>
              <Th>Points</Th>
              <Th>Wins</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scoreboard.map((elem) => (
              <Tr key={uuidv4()}>
                <Td>{elem.nickname}</Td>
                <Td>{elem.numofmatches} </Td>
                <Td>{elem.sumpoints} </Td>
                <Td>{elem.wins} </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Modal>
    </Flex>
  );
};

export default Scoreboard;
