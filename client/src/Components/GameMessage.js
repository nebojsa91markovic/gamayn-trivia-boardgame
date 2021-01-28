import { Flex, Text } from '@chakra-ui/react'
import React from 'react'



const GameMessage = ({ currentPlayer }) => {

    return (
        <Flex w="100%" h="30px" mt={{ base: "3rem", md: "7rem" }} ml={{ base: "4.5rem", md: "12rem" }} position="fixed">
            <Text fontSize={{ base: "20px", md: "25px" }} color="primary.400" mr="0.5rem" casing="uppercase">{currentPlayer} </Text>
            <Text w="100%" fontWeight="bold" color="secondary.600" fontSize={{ base: "20px", md: "25px" }} textAlign="left">
                is on the move
                </Text>
        </Flex>
    )
}

export default GameMessage
