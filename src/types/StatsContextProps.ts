import { Stats } from "./Stats";
import { StoredResponse } from "./StoredResponse";

export interface StatsContextProps {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  responses: Map<number, StoredResponse>;
  setResponses: React.Dispatch<React.SetStateAction<Map<number, StoredResponse>>>;
}
