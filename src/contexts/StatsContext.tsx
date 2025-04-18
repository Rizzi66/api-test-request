import React, { createContext, useState } from "react";
import { Stats } from "../types/Stats.ts";
import { StoredResponse } from "../types/StoredResponse.ts";

type StatsContextProps = {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  responses: Map<number, StoredResponse>;
  setResponses: React.Dispatch<React.SetStateAction<Map<number, StoredResponse>>>;
};

const StatsContext = createContext<StatsContextProps>({
  stats: new Stats(),
  setStats: () => {},
  isCompleted: false,
  setIsCompleted: () => {},
  responses: new Map(),
  setResponses: () => {},
});

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(new Stats());
  const [isCompleted, setIsCompleted] = useState(false);
  const [responses, setResponses] = useState<Map<number, StoredResponse>>(new Map());

  return (
    <StatsContext.Provider value={{ stats, setStats, isCompleted, setIsCompleted, responses, setResponses }}>
      {children}
    </StatsContext.Provider>
  );
};

export { StatsContext };
