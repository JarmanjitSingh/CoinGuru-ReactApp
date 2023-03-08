import { Container, Heading } from '@chakra-ui/react'
import React from 'react'

function ErrorComponent() {
  return (
    <Container p={'8'} h={'80vh'}>
        <Heading>Opps!! Something went wrong....</Heading>
    </Container>
  )
}

export default ErrorComponent
