import { MiddlewareFunction } from "./MiddelwareFunction";

export interface MiddlewareInputProps {
  onAddMiddleware: (fn: MiddlewareFunction, name: string) => void;
  middlewares: { name: string; fn: MiddlewareFunction }[];
}
