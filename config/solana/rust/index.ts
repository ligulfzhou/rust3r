import { solanaRustTxCodeKeys, solanaRustTxKeyToTitle, solanaRustTxKeyToCode } from "./transactions";
import { solanaRustKeyToCode, solanaRustKeyToTitle, solanaRustCodeKeys } from "./account";

// export * from './account';
// export * from './transactions'

export const typeToCodes = [
  {
    type: "Account",
    codeKeys: solanaRustCodeKeys
  },
  {
    type: "Transaction",
    codeKeys: solanaRustTxCodeKeys
  }
];

export const codeKeyToTitle = {
   ...solanaRustKeyToTitle,
  ...solanaRustTxKeyToTitle
}

export const codeKeyToCode = {
  ...solanaRustKeyToCode,
  ...solanaRustTxKeyToCode
}
