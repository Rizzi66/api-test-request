import { ChangeEvent, useContext } from "react";
import { FormContext } from "../../contexts/FormContext";
import { MiddlewareFunction } from "../../types/MiddelwareFunction";

function MiddlewareInput() {
  const { middlewares, setMiddlewares } = useContext(FormContext);

  const onAddMiddleware = (fn: MiddlewareFunction, name: string) => {
    setMiddlewares((prev) => [...prev, { name, fn }]);
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const codeText = await file.text();
        console.log(`CodeTest: ${codeText}`);
        const middlewareFunc = eval(`(${codeText})`);
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
    <div className="middleware-input">
      <label>Ajouter un middleware (fichier .js) :</label>

      <div className="middleware-upload">
        <input type="file" id="middleware-upload" multiple accept=".js" onChange={handleFileSelect} />

        {middlewares.length > 0 && (
          <ul className="middleware-list">
            {middlewares.map((mw, idx) => (
              <li key={idx}>{mw.name}</li>
            ))}
          </ul>
        )}
        {middlewares.length === 0 && <div className="middleware-placeholder">Aucun fichier sélectionné</div>}
      </div>
    </div>
  );
}

export default MiddlewareInput;
