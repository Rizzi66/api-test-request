import { useContext } from "react";
import { FormContext } from "../../contexts/FormContext";
import trashIcon from "../../assets/trash.svg";

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

  const deleteHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
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
          <button
            type="button"
            onClick={() => deleteHeader(index)}
            style={{
              marginBottom: "0.75rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img src={trashIcon} alt="Supprimer" width="16" height="16" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addHeader}
        style={{ fontSize: "small", backgroundColor: "darkslategrey", padding: "0.25rem" }}
      >
        + Ajouter un header
      </button>
    </div>
  );
}

export default HeadersInput;
