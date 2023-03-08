import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  HStack,
  Container,
  Image,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <ErrorComponent />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container maxW={"container.xl"}>
            <HStack wrap={"wrap"} justifyContent={"center"}>
              {exchanges.map((i) => {
                return (
                  <a href={i.url} target={"blank"} key={i.id}>
                    <VStack
                      w={"52"}
                      shadow={"lg"}
                      p={"8"}
                      m={"4"}
                      borderRadius={"lg"}
                      transition={"all, 0.3s"}
                      css={{ "&:hover": { transform: "scale(1.1)" } }}
                    >
                      <Image
                        src={i.image}
                        h={"10"}
                        w={"10"}
                        objectFit={"contain"}
                        alt={"exchanges"}
                      />
                      <Heading noOfLines={"1"}>{i.trust_score_rank}</Heading>
                      <Text noOfLines={"1"}>{i.name}</Text>
                    </VStack>
                  </a>
                );
              })}
            </HStack>
          </Container>
        </>
      )}
    </>
  );
}

export default Exchanges;
