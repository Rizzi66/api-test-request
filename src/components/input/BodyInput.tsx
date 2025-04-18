import { ChangeEvent, useContext } from "react";
import { FormContext } from "../../contexts/FormContext";

function BodyInput() {
  const { body, setBody, isRunning } = useContext(FormContext);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Body de la requête (JSON) :
        <textarea
          rows={5}
          style={{ width: "100%" }}
          value={body}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
          disabled={isRunning}
        ></textarea>
      </label>
    </div>
  );
}

export default BodyInput;
