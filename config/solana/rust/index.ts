import { solanaRustTxCodeKeys, solanaRustTxKeyToTitle, solanaRustTxKeyToCode } from "./transactions";
import { solanaRustKeyToCode, solanaRustKeyToTitle, solanaRustCodeKeys } from "./account";
import { solanaRustStakeKeyToTitle, solanaRustStakeCodeKeys, solanaRustStakeKeyToCode } from "./stake";

export const typeToCodes = [
  {
    type: "Account",
    codeKeys: solanaRustCodeKeys
  },
  {
    type: "Transaction",
    codeKeys: solanaRustTxCodeKeys
  },
  {
    type: "Stake",
    codeKeys: solanaRustStakeCodeKeys
  }
];

export const codeKeyToTitle = {
  ...solanaRustKeyToTitle,
  ...solanaRustTxKeyToTitle,
  ...solanaRustStakeKeyToTitle
};

export const codeKeyToCode = {
  ...solanaRustKeyToCode,
  ...solanaRustTxKeyToCode,
  ...solanaRustStakeKeyToCode
};
