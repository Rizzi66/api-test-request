import { FormEvent, useContext } from "react";
import URLInput from "./input/URLInput";
import NumberInput from "./input/NumberInput";
import HeadersInput from "./input/HeadersInput";
import BodyInput from "./input/BodyInput";
import { FormContext } from "../contexts/FormContext";
import { StatsContext } from "../contexts/StatsContext";
import { FormService } from "../services/FormService";
import MiddlewareInput from "./input/MiddlewareInput";

function FormInput() {
  const {
    url,
    method,
    requestCount,
    setRequestCount,
    interval,
    setInterval,
    vagues,
    setVagues,
    headers,
    body,
    middlewares,
    isRunning,
    setIsRunning,
  } = useContext(FormContext);

  const { setStats, setIsCompleted, setResponses } = useContext(StatsContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    FormService.startTest({
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
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <URLInput />
      <NumberInput label="Nombre de requêtes" value={requestCount} setValue={setRequestCount} min={1} />
      <NumberInput label="Intervalle entre vagues de requètes (ms)" value={interval} setValue={setInterval} min={0} />
      <NumberInput label="Nombre de vagues de requètes" value={vagues} setValue={setVagues} min={0} />
      <HeadersInput />
      <BodyInput />
      <MiddlewareInput />
      <button type="submit" disabled={isRunning}>
        {isRunning ? "Test en cours..." : "Lancer le test"}
      </button>
    </form>
  );
}

export default FormInput;
