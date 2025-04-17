import { useState, ChangeEvent, FormEvent } from "react";
import { FormInputProps } from "../types/FormInputProps";

function FormInput({ onStart, isRunning }: FormInputProps) {
  const [url, setUrl] = useState("");
  const [requestCount, setRequestCount] = useState(100);
  const [vagues, setVagues] = useState(1);
  const [interval, setInterval] = useState(0);
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("{}");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const headersObject: Record<string, string> = {};
    headers.forEach(({ key, value }) => {
      if (key.trim()) headersObject[key.trim()] = value;
    });
    onStart(url, requestCount, interval, method, vagues, body, headersObject);
  };

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          URL de l’API cible :
          <input
            type="text"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            style={{ width: "100%" }}
            required
          />
          <select value={method} onChange={(e) => setMethod(e.target.value)} disabled={isRunning}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Nombre de requêtes :
          <input
            type="number"
            value={requestCount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRequestCount(Number(e.target.value))}
            min={1}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Intervalle entre vagues de requètes (ms) :
          <input
            type="number"
            value={interval}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInterval(Number(e.target.value))}
            min={0}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Nombre de vagues de requètes :
          <input
            type="number"
            value={vagues}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVagues(Number(e.target.value))}
            min={0}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Headers de la requête :</label>
        {headers.map((header, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "0.25rem" }}>
            <input
              type="text"
              placeholder="Clé"
              value={header.key}
              onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            <input
              type="text"
              placeholder="Valeur"
              value={header.value}
              onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addHeader} style={{ marginTop: "0.5rem" }}>
          + Ajouter un header
        </button>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Body de la requête (JSON) :
          <textarea
            rows={5}
            style={{ width: "100%" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isRunning}
          ></textarea>
        </label>
      </div>
      <button type="submit" disabled={isRunning}>
        {isRunning ? "Test en cours..." : "Lancer le test"}
      </button>
    </form>
  );
}

export default FormInput;
