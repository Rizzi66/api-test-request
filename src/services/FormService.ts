import { Stats } from "../types/Stats";
import { RequestConfig } from "../types/RequestConfig";
import { StoredResponse } from "../types/StoredResponse";
import { MiddlewareFunction } from "../types/MiddelwareFunction";

type Headers = {
  key: string;
  value: string;
};

type FormInputProps = {
  url: string;
  method: string;
  requestCount: number;
  interval: number;
  vagues: number;
  headers: Headers[];
  body: string;
  middlewares: { name: string; fn: MiddlewareFunction }[];
  setIsRunning: (isRunning: boolean) => void;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  setIsCompleted: (isCompleted: boolean) => void;
  setResponses: React.Dispatch<React.SetStateAction<Map<number, StoredResponse>>>;
};

export class FormService {
  static async startTest({
    url,
    method,
    requestCount,
    interval,
    vagues,
    headers,
    body,
    middlewares,
    setIsRunning,
    setStats,
    setIsCompleted,
    setResponses,
  }: FormInputProps) {
    const headersObject: Record<string, string> = {};
    headers.forEach(({ key, value }) => {
      if (key.trim()) headersObject[key.trim()] = value;
    });

    if (!url || requestCount <= 0 || vagues <= 0) return;
    setStats(new Stats());
    setIsCompleted(false);
    setIsRunning(true);
    setResponses(new Map());

    for (let i = 0; i < vagues; i++) {
      const startVague = performance.now();
      await Promise.all(
        Array.from({ length: requestCount }, () =>
          this.runSingleRequest(url, method, headersObject, body, middlewares, setResponses, setStats)
        )
      );
      const endVague = performance.now();
      console.log(`Vague ${i + 1} termin\u00e9e en ${(endVague - startVague).toFixed(2)} ms`);

      if (i < vagues - 1 && interval > 0) {
        await new Promise((res) => setTimeout(res, interval));
      }
    }

    setIsRunning(false);
    setIsCompleted(true);
  }

  private static async runSingleRequest(
    url: string,
    method: string,
    headers: Record<string, string>,
    body: string,
    middlewares: { name: string; fn: MiddlewareFunction }[],
    setResponses: React.Dispatch<React.SetStateAction<Map<number, StoredResponse>>>,
    setStats: React.Dispatch<React.SetStateAction<Stats>>
  ) {
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
        this.applyMiddlewares(reqConfig, middlewareFns, resolve);
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
  }

  private static applyMiddlewares = (
    req: RequestConfig,
    middlewaresList: MiddlewareFunction[],
    finalCallback: () => void
  ) => {
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
}
