import { RequestConfig } from "./RequestConfig";

export type MiddlewareFunction = (req: RequestConfig, res: Response, next: () => void) => void;
