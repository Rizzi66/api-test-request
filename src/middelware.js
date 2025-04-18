function verifyTokenMiddleware(req, res, next) {
  async function mineNonce() {
    const challenge = "test";
    let nonce = 0;
    const prefix = "000";
    let hash = "";

    while (true) {
      const data = new TextEncoder().encode(challenge + nonce);
      const buffer = await crypto.subtle.digest("SHA-256", data);
      hash = Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (hash.startsWith(prefix)) {
        break;
      }
      nonce++;
    }

    return { nonce, challenge };
  }

  mineNonce().then(({ nonce, challenge }) => {
    req.headers = {
      ...(req.headers || {}),
      "Content-Type": "application/json",
    };
    req.body = JSON.stringify({ nonce, challenge });

    console.log("[Middleware PoW] challenge:", challenge, "nonce:", nonce);
    next();
  });
}
