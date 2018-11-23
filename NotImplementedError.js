class NotImplementedError extends Error {
  constructor(methodName, ...args) {
    super(`${methodName} method not implemented`, ...args);
  }
}
