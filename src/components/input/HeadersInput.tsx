import { useContext } from "react";
import { FormContext } from "../../contexts/FormContext";

function HeadersInput() {
  const { headers, setHeaders } = useContext(FormContext);

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  return (
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
  );
}

export default HeadersInput;
