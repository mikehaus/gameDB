import React from "react";
import styled from "styled-components";
import { ChakraProvider, Flex, Heading, Spacer } from "@chakra-ui/react";

import theme from "./utils/theme";

import { GameContextProvider } from "./context/gameContext";
import "./App.css";
import Kanban from "./components/kanban";
import SearchBar from "./components/searchBar";

const MainFlex = styled(Flex)`
  margin: 16px 32px;
  padding: 0;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GameContextProvider>
        <Flex h="50px" alignContent="center" p="16px 32px">
          <Heading color="teal.100" size="lg">
            Video Game Backlog
          </Heading>
          <Spacer />
          <SearchBar />
        </Flex>
        <MainFlex alignContent="center">
          <Kanban />
        </MainFlex>
      </GameContextProvider>
    </ChakraProvider>
  );
}

export default App;
