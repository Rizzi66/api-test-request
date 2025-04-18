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
    <div className="stats-page">
      <h2>{isCompleted ? "Résumé final des statistiques" : "Statistiques en temps réel"}</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <strong>Requêtes totales envoyées :</strong>
          <span>{totalSent}</span>
        </div>
        <div className="stat-card">
          <strong>Réussites (2xx) :</strong>
          <span>{success}</span>
        </div>
        <div className="stat-card">
          <strong>Échecs réseau :</strong>
          <span>{networkErrors}</span>
        </div>
        <div className="stat-card">
          <strong>Erreurs 4xx :</strong>
          <span>{errors4xx}</span>
        </div>
        <div className="stat-card">
          <strong>Erreurs 5xx :</strong>
          <span>{errors5xx}</span>
        </div>
        <div className="stat-card">
          <strong>Temps de réponse moyen :</strong>
          <span>{avgTimeFmt} ms</span>
        </div>
        <div className="stat-card">
          <strong>Temps de réponse min :</strong>
          <span>{minTimeFmt} ms</span>
        </div>
        <div className="stat-card">
          <strong>Temps de réponse max :</strong>
          <span>{maxTimeFmt} ms</span>
        </div>
        <div className="stat-card">
          <strong>Taux de réussite :</strong>
          <span>{successRateFmt} %</span>
        </div>
      </div>

      {isCompleted && (
        <div className="responses-section">
          <h3>Réponses par status :</h3>
          {[...responses.entries()].map(([status, res]) => (
            <div key={status} className="response-entry">
              <strong>
                {status} {res.statusText}
              </strong>
              <pre>
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
