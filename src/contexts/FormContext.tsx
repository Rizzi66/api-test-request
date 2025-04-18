import React, { createContext, useState } from "react";
import { MiddlewareFunction } from "../types/MiddelwareFunction";

type FormContextProps = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  requestCount: number;
  setRequestCount: React.Dispatch<React.SetStateAction<number>>;
  interval: number;
  setInterval: React.Dispatch<React.SetStateAction<number>>;
  vagues: number;
  setVagues: React.Dispatch<React.SetStateAction<number>>;
  headers: { key: string; value: string }[];
  setHeaders: React.Dispatch<React.SetStateAction<{ key: string; value: string }[]>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  middlewares: { name: string; fn: MiddlewareFunction }[];
  setMiddlewares: React.Dispatch<React.SetStateAction<{ name: string; fn: MiddlewareFunction }[]>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormContext = createContext<FormContextProps>({
  url: "",
  setUrl: () => {},
  method: "GET",
  setMethod: () => {},
  requestCount: 100,
  setRequestCount: () => {},
  interval: 0,
  setInterval: () => {},
  vagues: 1,
  setVagues: () => {},
  headers: [{ key: "", value: "" }],
  setHeaders: () => {},
  body: "{}",
  setBody: () => {},
  middlewares: [],
  setMiddlewares: () => {},
  isRunning: false,
  setIsRunning: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [requestCount, setRequestCount] = useState(100);
  const [interval, setInterval] = useState(0);
  const [vagues, setVagues] = useState(1);
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [body, setBody] = useState("{}");
  const [isRunning, setIsRunning] = useState(false);
  const [middlewares, setMiddlewares] = useState<{ name: string; fn: MiddlewareFunction }[]>([]);

  return (
    <FormContext.Provider
      value={{
        url,
        setUrl,
        method,
        setMethod,
        requestCount,
        setRequestCount,
        interval,
        setInterval,
        vagues,
        setVagues,
        headers,
        setHeaders,
        body,
        setBody,
        middlewares,
        setMiddlewares,
        isRunning,
        setIsRunning,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext };
