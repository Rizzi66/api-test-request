import { ChangeEvent, useContext } from "react";
import { FormContext } from "../../contexts/FormContext";

function URLInput() {
  const { url, setUrl, method, setMethod, isRunning } = useContext(FormContext);

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <label>
        URL de l’API cible :
        <div style={{ display: "flex" }}>
          <select
            style={{ width: "20%", marginRight: "0.5rem" }}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            disabled={isRunning}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            style={{ width: "100%" }}
            required
          />
        </div>
      </label>
    </div>
  );
}

export default URLInput;
