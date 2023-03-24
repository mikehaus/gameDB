import React from "react";
import { Flex } from "@chakra-ui/react";

import StatusColumn from "./statusColumn";

import { useGameContext } from "../context/gameContext";
import { getGamesByStatus } from "../utils/api/games";

function Kanban() {
  const { games } = useGameContext();

  const todoGames = getGamesByStatus(games, "toDo");
  const inProgressGames = getGamesByStatus(games, "inProgress");
  const completedGames = getGamesByStatus(games, "completed");

  // TODO: MAP OVER DATA
  return (
    <>
      <Flex width="100%" justifyContent="space-around" m="30px">
        <StatusColumn category="TO DO" games={todoGames} />
        <StatusColumn category="IN PROGRESS" games={inProgressGames} />
        <StatusColumn category="COMPLETED" games={completedGames} />
      </Flex>
    </>
  );
}

export default Kanban;
