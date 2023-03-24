import { useReducer } from "react";
import {
  TEST_GAME,
  TEST_GAME_2,
  TEST_GAME_3,
  TEST_GAME_4,
} from "../../db/data";

import { addGame, deleteGame, updateGame } from "../../utils/api/games";

const reducer = (currentState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_GAME:
      return {
        games: addGame(action.payload.game, currentState.games),
        ...currentState,
      };

    case ACTION_TYPES.DELETE_GAME:
      return {
        games: deleteGame(action.payload.game, currentState.games),
      };

    case ACTION_TYPES.UPDATE_GAME:
      return {
        games: updateGame(action.payload.game, currentState.games),
        ...currentState,
      };

    default:
      return currentState;
  }
};

const initState = () => (initialState) => {
  return {
    ...initialState,
  };
};

export const ACTION_TYPES = {
  ADD_GAME: "ADD_GAME",
  DELETE_GAME: "DELETE_GAME",
  UPDATE_GAME: "UPDATE_GAME",
};

export const addGameToContext = (game) => ({
  type: ACTION_TYPES.ADD_GAME,
  payload: {
    game,
  },
});

export const deleteGameFromContext = (game) => ({
  type: ACTION_TYPES.DELETE_GAME,
  payload: {
    game,
  },
});

export const updateGameInContext = (game) => ({
  type: ACTION_TYPES.UPDATE_GAME,
  payload: {
    game,
  },
});

// TODO: May need to structure this differently into a single game object for simplicity in reading
const INITIAL_STATE = {
  games: [TEST_GAME, TEST_GAME_2, TEST_GAME_3, TEST_GAME_4],
};

export const useGameStateReducer = () =>
  useReducer(reducer, INITIAL_STATE, initState());
