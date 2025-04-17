import { useContext } from "react";
import { StatsContext } from "../contexts/StatsContextDefinition.tsx";

export const useStatsContext = () => {
  const statsContext = useContext(StatsContext);
  if (!statsContext) {
    throw new Error("StatsContext n'est pas présent.");
  }
  return statsContext;
};
