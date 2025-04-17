import { createContext } from "react";
import { StatsContextProps } from "../types/StatsContextProps";

export const StatsContext = createContext<StatsContextProps | undefined>(undefined);
