import { Box, VStack, Spinner } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <VStack height={"90vh"} justifyContent={'center'}>
      <Box transform={'scale(3)'}>
        <Spinner size={'xl'} />
      </Box>
    </VStack>
  )
}

export default Loader;
