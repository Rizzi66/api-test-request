import { useStatsContext } from "../hooks/useStatsContext.ts";
import { useState } from "react";
import FormInput from "../components/FormInput.tsx";
import { RequestConfig } from "../types/RequestConfig.ts";
import { Stats } from "../types/Stats.ts";
import { MiddlewareFunction } from "../types/MiddelwareFunction.ts";
import MiddlewareInput from "../components/MiddlewareInput.tsx";

function Home() {
  const { setStats, setIsCompleted, setResponses } = useStatsContext();

  const [isRunning, setIsRunning] = useState(false);
  const [middlewares, setMiddlewares] = useState<{ name: string; fn: MiddlewareFunction }[]>([]);

  const applyMiddlewares = (req: RequestConfig, middlewaresList: MiddlewareFunction[], finalCallback: () => void) => {
    console.log("req", req);
    console.log("middlewaresList", middlewaresList);
    let index = 0;
    const next = () => {
      if (index < middlewaresList.length) {
        const mockResponse: Response = new Response(null, { status: 200 });
        middlewaresList[index++](req, mockResponse, next);
      } else {
        finalCallback();
      }
    };
    next();
  };

  const handleAddMiddleware = (fn: MiddlewareFunction, name: string) => {
    setMiddlewares((prev) => [...prev, { name, fn }]);
  };

  const startTest = async (
    url: string,
    count: number,
    interval: number,
    method: string,
    vagues: number,
    body: string,
    headers: Record<string, string>
  ) => {
    if (!url || count <= 0 || vagues <= 0) return;
    setStats(new Stats());
    setIsCompleted(false);
    setIsRunning(true);
    setResponses(new Map());

    const runSingleRequest = async () => {
      const reqConfig: RequestConfig = { url, options: { method, headers: { ...headers } } };

      if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && body.trim()) {
        reqConfig.options.body = body;

        if (!(reqConfig.options.headers as Record<string, string>)["Content-Type"]) {
          (reqConfig.options.headers as Record<string, string>)["Content-Type"] = "application/json";
        }
      }

      const startTime = performance.now();

      await new Promise<void>((resolve) => {
        if (middlewares.length > 0) {
          const middlewareFns = middlewares.map((mw) => mw.fn);
          applyMiddlewares(reqConfig, middlewareFns, resolve);
        } else {
          resolve();
        }
      });

      try {
        const response = await fetch(reqConfig.url, reqConfig.options);
        const endTime = performance.now();
        const duration = endTime - startTime;

        const cloned = response.clone();
        cloned.text().then((bodyText) => {
          setResponses((prev) => {
            if (prev.has(response.status)) return prev;

            const newMap = new Map(prev);
            newMap.set(response.status, {
              status: response.status,
              statusText: response.statusText,
              body: bodyText,
            });
            return newMap;
          });
        });

        setStats((prev) => {
          const newStats = { ...prev };
          newStats.totalSent += 1;
          if (response.ok) {
            newStats.success += 1;
          } else if (response.status >= 500) {
            newStats.errors5xx += 1;
          } else if (response.status >= 400) {
            newStats.errors4xx += 1;
          }
          newStats.totalTime += duration;
          newStats.minTime = Math.min(newStats.minTime, duration);
          newStats.maxTime = Math.max(newStats.maxTime, duration);
          return newStats;
        });
      } catch (err) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.error("error:", err);
        setStats((prev) => {
          const newStats = { ...prev };
          newStats.totalSent += 1;
          newStats.networkErrors += 1;
          newStats.totalTime += duration;
          newStats.minTime = Math.min(newStats.minTime, duration);
          newStats.maxTime = Math.max(newStats.maxTime, duration);
          return newStats;
        });
      }
    };

    for (let i = 0; i < vagues; i++) {
      const startVague = performance.now();
      await Promise.all(Array.from({ length: count }, () => runSingleRequest()));
      const endVague = performance.now();
      console.log(`Vague ${i + 1} termin\u00e9e en ${(endVague - startVague).toFixed(2)} ms`);

      if (i < vagues - 1 && interval > 0) {
        await new Promise((res) => setTimeout(res, interval));
      }
    }

    setIsRunning(false);
    setIsCompleted(true);
  };

  return (
    <div>
      <FormInput onStart={startTest} isRunning={isRunning}></FormInput>
      <MiddlewareInput onAddMiddleware={handleAddMiddleware} middlewares={middlewares} />
    </div>
  );
}

export default Home;
