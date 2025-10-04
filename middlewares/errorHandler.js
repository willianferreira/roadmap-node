export function errorHandler(err, req, res, next) {
  console.log("Error", err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: message });
}

export function throwNotFound(entity = "Resource") {
  const err = new Error(`${entity} not found!`);
  err.status = 404;
  throw err;
}
