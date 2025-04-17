import React, { useState } from "react";
import { Stats } from "../types/Stats.ts";
import { StatsContext } from "./StatsContextDefinition.tsx";
import { StoredResponse } from "../types/StoredResponse.ts";

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
