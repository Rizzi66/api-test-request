// Ce fichier doit retourner une fonction middleware, comme celui-ci :
(req, res, next) => {
  const secretKey = "mdpsecret";

  async function verifyToken(token, secret) {
    try {
      const [encodedPayload, encodedSignature] = token.split(".");

      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encodedPayload));

      const signatureCheck = btoa(String.fromCharCode(...new Uint8Array(sigBuffer)));

      if (signatureCheck !== encodedSignature) {
        console.log("Signature invalide !");
        return null;
      }

      const payloadJSON = atob(encodedPayload);
      const payload = JSON.parse(payloadJSON);
      console.log("Token valide. ID utilisateur :", payload.userId);
      return payload;
    } catch (err) {
      console.error("Erreur de vérification du token :", err);
      return null;
    }
  }

  // Simulation d'un en-tête Authorization dans req.options.headers
  (async () => {
    const headers = req.options.headers || {};
    const token = headers["Authorization"] || headers["authorization"];

    if (!token) {
      console.log("Aucun token fourni.");
      return;
    }

    const payload = await verifyToken(token, secretKey);
    if (!payload) {
      console.log("Token invalide");
      return;
    }

    next();
  })();
};
