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
  Button,
  RadioGroup,
  Radio
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (arg) => {
    setPage(arg);
    setLoading(true);
  };

  const btn = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container maxW={"container.xl"}>
            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
              <HStack spacing={'4'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
              </HStack>
            </RadioGroup>
            <HStack wrap={"wrap"} justifyContent={"center"}>
              {coins.map((i) => {
                return (
                  <Link to={`/coin/${i.id}`} key={i.id}>
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
                      <Heading noOfLines={"1"}>{i.symbol}</Heading>
                      <Text noOfLines={"1"}>{i.name}</Text>
                      <Text noOfLines={"1"}>
                        {currencySymbol}
                        {i.current_price}
                      </Text>
                    </VStack>
                  </Link>
                );
              })}
            </HStack>
            <HStack w={"full"} p={"8"} overflowX={"auto"}>
              {btn.map((item, index) => {
                return <Button
                  key={index}
                  bgColor={"black"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>;
              })}
            </HStack>
          </Container>
        </>
      )}
    </>
  );
}

export default Coins;
