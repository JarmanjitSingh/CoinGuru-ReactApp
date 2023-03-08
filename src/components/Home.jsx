import { Box, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { motion } from "framer-motion";
import homeSrc from '../assets/home.jpg'


function Home() {
  return (
    <Box h={['80vh','90vh']} w={'full'} bgColor={'black'}>
      <motion.div
      style={{
        height: "90vh"
      }}
      animate={{
        translateY: '20px'
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }}>

      <Image src={homeSrc} h={'80vh'} w={'full'} objectFit={'contain'} />
      </motion.div>
    </Box>
  )
}

export default Home
