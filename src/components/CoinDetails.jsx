import {
  Badge,
  Box,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
import Loader from "./Loader";

function CoinDetails() {
  const [coins, setCoins] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params = useParams();

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoinDetail();
  }, [params.id]);

  if (error) return <ErrorComponent />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text>
              Last Updated On{" "}
              {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coins.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coins.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.600"} color={"white"}>
              {`#${coins.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} low={`${currencySymbol}${coins.market_data.low_24h[currency]}`} />

            <Box w={'full'} p='4'>
                  <Item title={'Max Supply'} value={coins.market_data.max_supply} />
                  <Item title={'Circulating Supply'} value={coins.market_data.circulating_supply} />
                  <Item title={'Market Cap'} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`} />
                  <Item title={'All Time Low'} value={`${currencySymbol}${coins.market_data.atl[currency]}`} />
                  <Item title={'All Time High'} value={`${currencySymbol}${coins.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
}

const Item = ({title, value})=> (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => {
  return <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>;
};
export default CoinDetails;
