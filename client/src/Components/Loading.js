import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {

    return (
        <Flex h="100vh" bg="primary.800" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="primary.400" />
        </Flex>
    )
}

export default Loading