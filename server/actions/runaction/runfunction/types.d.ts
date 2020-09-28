export type Result = {
  pass: boolean,
  label: string,
  data?: {},
  followups?: Object.<string, {}>
}