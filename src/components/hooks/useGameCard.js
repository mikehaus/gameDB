import { useToast } from "@chakra-ui/react";

import { useGameContext } from "../../context/gameContext";
import {
  deleteGameFromContext,
  updateGameInContext,
} from "../../context/hooks/useGameStateReducer";

/**
 * Hook to abstract away logic for use in the GameCard component
 */

function useGameCard({ game }) {
  const { title, status } = game;

  const { dispatch } = useGameContext();
  const toast = useToast();

  const getColorScheme = () => {
    let colorScheme = "teal";

    switch (status) {
      case "toDo":
        colorScheme = "yellow";
        break;
      case "inProgress":
        colorScheme = "blue";
        break;
      default:
        colorScheme = "teal";
        break;
    }

    return colorScheme;
  };

  const getNextStatus = () => {
    switch (status) {
      case "toDo":
        return "inProgress";
      case "inProgress":
        return "completed";
      case "completed":
        return "archived";
    }
  };

  const getPreviousStatus = () => {
    switch (status) {
      case "inProgress":
        return "toDo";
      case "completed":
        return "inProgress";
    }
  };

  const moveNextStatus = () => {
    const updatedGame = {
      ...game,
    };
    updatedGame.status = getNextStatus();
    dispatch(updateGameInContext(updatedGame));
    toast({
      title: `Moved ${title} to ${getNextStatus()}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const movePreviousStatus = () => {
    const updatedGame = {
      ...game,
    };
    updatedGame.status = getPreviousStatus();
    dispatch(updateGameInContext(updatedGame));
    toast({
      title: `Moved ${title} to ${getPreviousStatus()}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDelete = () => {
    dispatch(deleteGameFromContext(game));
    toast({
      title: `Deleted ${title} from Kanban`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return {
    getColorScheme,
    moveNextStatus,
    movePreviousStatus,
    handleDelete,
    getNextStatus,
    getPreviousStatus,
  };
}

export default useGameCard;
