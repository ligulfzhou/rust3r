
export const solanaRustKeyToCode: { [key: string]: string; } = {
  "random_account": `
use solana_sdk::signature::Keypair;

Keypair::new()
  `,
  "gen_mnemonic": `
use bip39::Mnemonic;

Mnemonic::generate(word_count)
    .expect("word count not valid")
    .to_string()
`,
  "mnemonic_account": `
use bip39::Mnemonic;
use solana_sdk::{
    derivation_path::DerivationPath,
    pubkey::Pubkey,
    signature::{
        generate_seed_from_seed_phrase_and_passphrase, keypair_from_seed_and_derivation_path,
        Keypair, Signer,
    },
};

pub fn get_keypair_with(phrase: &str, at_index: u32) -> Keypair {
  let seed = generate_seed_from_seed_phrase_and_passphrase(phrase, "");
  let derivation_path = DerivationPath::new_bip44(Some(at_index), Some(0));
  keypair_from_seed_and_derivation_path(&seed, Some(derivation_path)).expect("get keypair")
}

fn main() {
  let mnemonic = Mnemonic::generate(word_count)
    .expect("word count not valid")
    .to_string();

  for idx in 0..=10 {
    get_keypair_with(&mnemonic, idx);
  }
}
`,
  "sign_messages": `
pub fn sign(keypair: Keypair, msg: String) -> String {
    keypair.sign_message(&msg.as_bytes()).to_string()
}
`
};

export const solanaRustKeyToTitle: { [key: string]: string; } = {
  "random_account": 'Random Account',
  "gen_mnemonic": "Generate Mnemonic",
  "mnemonic_account": "Gen Accounts from mnemonic",
  "sign_messages": "Sign Message"
};



export const solanaRustCodeKeys = [
  'random_account',
  'gen_mnemonic',
  'mnemonic_account',
  'sign_messages'
]
