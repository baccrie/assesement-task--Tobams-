export default interface ICustomError extends Error {
  errors(errors: any): unknown;
  path: any;
  title: string;
  keyValue(keyValue: any): unknown;
  code?: number;
  statusCode?: number;
  msg?: string;
}
