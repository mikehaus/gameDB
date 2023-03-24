import React from "react";
import { Heading, Flex } from "@chakra-ui/react";

import GameCard from "./gameCard";

// TODO: refactor to use context instead of passed down in props
function StatusColumn({ category, games }) {
  return (
    <>
      <Flex display="column" justifyContent="center">
        <Heading size="md" textAlign="center">
          {category}
        </Heading>
        <div style={{ margin: "30px 0", padding: "5px" }}>
          <Flex
            display="column"
            overflowY="scroll"
            justifyContent="center"
            maxHeight="78vh"
            borderRadius="lg"
          >
            <CardList games={games} />
          </Flex>
        </div>
      </Flex>
    </>
  );
}

function CardList({ games }) {
  const cardListItems = games.map((game) => (
    <li>
      <GameCard game={game} />
    </li>
  ));

  return (
    <>
      <ul>{cardListItems}</ul>
    </>
  );
}

export default StatusColumn;
