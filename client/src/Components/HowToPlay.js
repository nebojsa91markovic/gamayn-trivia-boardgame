import {
    Button,
    Divider,
    Image,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import React from "react";

const HowToPlay = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" >
            <ModalOverlay />
            <ModalContent bg="primary.200">
                <ModalHeader>Gamayun: How to play</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <List>
                        <ListItem>Gamayun can be played by 2 to 4 players.</ListItem>
                        <ListItem>- Play with your friends online.</ListItem>
                        <ListItem>- Roll the dice to move to a field on the board.</ListItem>
                        <ListItem>- Then roll the dice again to choose question difficulty.</ListItem>
                        <Divider />
                        <ListItem color="primary.800" fontWeight="bold">- Points:</ListItem>
                        <Divider />
                        <ListItem>If you roll 1 or 2 and answer the question right - Easy 5 points</ListItem>
                        <Divider />
                        <ListItem>If you roll 3 or 4 and answer the question right - Medium 10 points</ListItem>
                        <Divider />
                        <ListItem>If you roll 5 or 6 and answer the question right - Hard 15 points</ListItem>
                        <Divider />
                        <ListItem>- The first player to reach 100 points is the winner. Happy playing!</ListItem>

                        <ListItem color="primary.800" fontWeight="bold" >-Categories:</ListItem>
                        <Divider />
                        <ListItem display="flex"><Image src="/images/cards/Animals.png" w="25px" /><Text color="blue.500">- Animals</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/Sports.png" w="25px" /><Text color="green.600">- Sports</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/Book.png" w="25px" /><Text color="red.200">- Book</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/Film.png" w="25px" /><Text color="teal.200">- Film</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/GeneralKnowledge.png" w="25px" /><Text color="yellow.400">- General knowledge</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/Geography.png" w="25px" /><Text color="orange.400">- Geography</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/History.png" w="25px" /><Text color="red.500">- History</Text></ListItem>
                        <ListItem display="flex"><Image src="/images/cards/Music.png" w="25px" /><Text color="purple.500">- Music</Text></ListItem>
                    </List>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary.100" bg="primary.400" mr={3} onClick={onClose}>
                        Close
          </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default HowToPlay;
