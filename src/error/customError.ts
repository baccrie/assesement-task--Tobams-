export default class customError extends Error {
  msg: string | undefined;

  constructor(msg: string | undefined){
    super(msg)
  }
}