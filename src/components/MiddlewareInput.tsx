import React, { ChangeEvent } from "react";
import { MiddlewareInputProps } from "../types/MiddlewareInputProps";

const MiddlewareInput: React.FC<MiddlewareInputProps> = ({ onAddMiddleware, middlewares }) => {
  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const codeText = await file.text();
        console.log(`CodeTest: ${codeText}`);
        const middlewareFunc = eval(codeText);
        if (typeof middlewareFunc === "function") {
          onAddMiddleware(middlewareFunc, file.name);
          console.log(`Middleware "${file.name}" chargé avec succès.`);
        } else {
          console.warn(`Le fichier ${file.name} n'exporte pas de fonction valide.`);
        }
      } catch (err) {
        console.error(`Erreur lors du chargement du middleware ${file.name} :`, err);
      }
    }
    e.target.value = "";
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label style={{ display: "block", marginBottom: "0.25rem" }}>Ajouter un middleware (fichier .js) :</label>
      <input type="file" multiple accept=".js" onChange={handleFileSelect} />
      {middlewares.length > 0 && (
        <div style={{ marginTop: "0.5rem" }}>
          <strong>Middlewares actifs :</strong>
          <ul>
            {middlewares.map((mw, idx) => (
              <li key={idx}>{mw.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MiddlewareInput;
