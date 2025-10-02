export function requestTime(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`time: [${req.method}] ${req.originalUrl} - ${duration} ms`);
  });

  next();
}
