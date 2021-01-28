import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  List,
  ListItem,
  Slide,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";

const Chat = ({ allMessage, sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const message = useRef(null);
  const lastMessage = useRef(null);
  const { isOpen, onToggle } = useDisclosure();

  const handleMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim().length !== 0) {
      sendMessage(newMessage);
      message.current.value = "";
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessage]);
  return (
    <>
      <>
        <Button
          onClick={onToggle}
          position="fixed"
          left="0"
          h="45px"
          bottom="0"
          borderRadius="1px"
          color="primary.800"
          w="100px"

        >
          CHAT <ArrowUpIcon />
        </Button>
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
          <Button
            borderRadius="1px"
            ml="1rem"
            onClick={onToggle}
            color="primary.800"
          >
            CLOSE
            <ArrowDownIcon />
          </Button>
          <Flex
            h="300px"
            w={{ base: "300px", md: "400px" }}
            p="15px"
            color="black"
            bg="primary.200"
            rounded="md"
            shadow="md"
            boxShadow="0 0 3px 1px gray"
            flexDirection="column"
          >
            <Text color="primary.800">CHAT</Text>
            <Divider />
            <Flex h="75%" overflowY="scroll" w="100%" mb="1rem" p="0.5rem">
              <List>
                {allMessage.map((msg, index) => (
                  <ListItem key={index}>
                    <Flex>
                      <Text casing="capitalize">{msg.user}: </Text>
                      <Text>{msg.msg}</Text>
                    </Flex>
                  </ListItem>
                ))}
                <Box ref={lastMessage} />
              </List>
            </Flex>
            <form>
              <Flex>
                <Input
                  onChange={(e) => setNewMessage(e.target.value)}
                  ref={message}
                  variant="outline"
                  borderColor="primary.800"
                  placeholder="Your message..."
                  type="text"
                  w="70%"
                />
                <Button
                  type="submit"
                  onClick={(e) => handleMessage(e)}
                  bg="primary.800"
                  color="primary.100"
                  ml="1rem"
                >
                  Send
                </Button>
              </Flex>
            </form>
          </Flex>
        </Slide>
      </>
    </>
  );
};

export default Chat;
