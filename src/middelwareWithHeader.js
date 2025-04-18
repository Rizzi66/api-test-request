function proofOfWorkMiddleware(req, res, next) {
  const timestamp = req.headers["x-timestamp"];
  const fingerprint = req.headers["x-fingerprint"];
  const powSolution = req.headers["x-pow-solution"];
  const powNonce = req.headers["x-pow-nonce"];

  if (!timestamp || !fingerprint || !powSolution || !powNonce) {
    recordError("MISSING_POW_HEADERS");
    incrementIpError(req.ip, "MISSING_POW_HEADERS");
    return res.status(400).json({ message: "Missing PoW headers" });
  }

  const requestTime = new Date(timestamp).getTime();
  const currentTime = Date.now();
  if (Math.abs(currentTime - requestTime) > 3000) {
    recordError("POW_TIMESTAMP_EXPIRED");
    return res.status(400).json({ message: "Request timestamp is invalid or expired." });
  }

  const hash = crypto
    .createHash("sha256")
    .update(fingerprint + timestamp + powNonce)
    .digest("hex");
  if (hash !== powSolution || !hash.startsWith("0".repeat(currentPowLevel))) {
    recordError("INVALID_POW_SOLUTION");
    incrementIpError(req.ip, "INVALID_POW_SOLUTION");
    return res.status(403).json({ message: "Invalid PoW solution" });
  }

  next();
}
