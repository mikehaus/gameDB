import React, { useMemo, useContext } from "react";
import { useGameStateReducer } from "./hooks/useGameStateReducer";

const GameContext = React.createContext({});

export function GameContextProvider({ children }) {
  const [state, dispatch] = useGameStateReducer();

  const contextValue = useMemo(() => {
    const reducerState = { ...state };

    return {
      dispatch,
      ...reducerState,
    };
  }, [dispatch, state]);

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}

export default GameContext;
