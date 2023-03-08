import { Heading, HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname === '/exchanges'){
      document.title = "CoinGuru - Exchanges"
    }
    else if(location.pathname === '/coins'){
      document.title = "CoinGuru - Coins"
    }
    else{
      document.title = "CoinGuru"
    }
    
  },[location])
  return (
    <HStack p={"4"} spacing={['1',"4"]} justifyContent={['space-evenly','space-between']} bgColor={"blackAlpha.900"} color={"white"}>
      <Heading fontSize={['larger', '4xl']} >CoinGuru</Heading>
      <HStack spacing={['4','6']} >
        <Link to={"/"}>Home</Link>
        <Link to={"/exchanges"}>Exchanges</Link>
        <Link to={"/coins"}>Coins</Link>
      </HStack>
    </HStack>
  );
}

export default Header;
