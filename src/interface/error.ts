export default interface ICustomError extends Error {
  statusCode?: number;
  msg?: string;
}
