import { useContext } from "react";
import { StatsContext } from "../contexts/StatsContext";

function Stats() {
  const { stats, isCompleted, responses } = useContext(StatsContext);

  const { totalSent, success, networkErrors, errors4xx, errors5xx, minTime, maxTime, totalTime } = stats;

  const completedCount = success + networkErrors + errors4xx + errors5xx;
  const avgTime = completedCount > 0 ? totalTime / completedCount : 0;

  const minTimeFmt = completedCount > 0 ? minTime.toFixed(2) : "0";
  const maxTimeFmt = completedCount > 0 ? maxTime.toFixed(2) : "0";
  const avgTimeFmt = completedCount > 0 ? avgTime.toFixed(2) : "0";

  const successRate = totalSent > 0 ? (success / totalSent) * 100 : 0;
  const successRateFmt = successRate.toFixed(2);

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h2>{isCompleted ? "Résumé final des statistiques" : "Statistiques en temps réel"}</h2>
      <p>
        <strong>Requêtes totales envoyées :</strong> {totalSent}
      </p>
      <p>
        <strong>Réussites (2xx) :</strong> {success}
      </p>
      <p>
        <strong>Échecs réseau :</strong> {networkErrors}
      </p>
      <p>
        <strong>Erreurs 4xx :</strong> {errors4xx}
      </p>
      <p>
        <strong>Erreurs 5xx :</strong> {errors5xx}
      </p>
      <p>
        <strong>Temps de réponse moyen :</strong> {avgTimeFmt} ms
      </p>
      <p>
        <strong>Temps de réponse min :</strong> {minTimeFmt} ms
      </p>
      <p>
        <strong>Temps de réponse max :</strong> {maxTimeFmt} ms
      </p>
      <p>
        <strong>Taux de réussite :</strong> {successRateFmt} %
      </p>
      {isCompleted && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Réponses par status :</h3>
          {[...responses.entries()].map(([status, res]) => (
            <div key={status} style={{ marginBottom: "1rem" }}>
              <strong>
                {status} {res.statusText}
              </strong>
              <pre
                style={{
                  background: "#050505",
                  padding: "0.5rem",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  textAlign: "left",
                }}
              >
                {(() => {
                  try {
                    return JSON.stringify(JSON.parse(res.body), null, 3);
                  } catch {
                    return res.body;
                  }
                })()}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;
