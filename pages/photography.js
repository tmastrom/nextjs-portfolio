import React, { useState } from "react";
import { ChakraProvider, Box, Container, Text, Wrap, WrapItem } from '@chakra-ui/react'
import Head from 'next/head'
import Image from "next/image";

import {getCuratedPhotos} from "../lib/api"
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Photography({data}) {
  const [photos, setPhotos] = useState(data);
  return (
    <ChakraProvider>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <Box overflow="hidden" bg="purple.100" minH="100vh">
          <Container>
            <Text
              color="pink.800"
              fontWeight="semibold"
              mb="1rem"
              textAlign="center"
              textDecoration="underline"
              fontSize={["4xl", "4xl", "5xl", "5xl"]}
            >
              NextJS Image Gallery
            </Text>
          </Container>

          <Wrap px="1rem" spacing={4} justify="center">
            
              
            <WrapItem
              key={photos.id}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}
            >
              <Image 
                src={photos.src.original} 
                width="500" 
                height="500" 
                alt={photos.url}/>
            </WrapItem>
              
            
          </Wrap>
        </Box>
    </ChakraProvider>
  )
}

export async function getServerSideProps() {
  const data = await getCuratedPhotos();
  return {
    props: {
      data,
    },
  };
}