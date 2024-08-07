
export const solanaRustKeyToCode: { [key: string]: string; } = {
  "random_keypair": `
use solana_sdk::signature::Keypair;

pub fn random_keypair()-> Keypair {
    Keypair::new()
}
  `,



  "gen_mnemonic": `
use bip39::Mnemonic;

pub fn generate_mnemonic_code(word_count: usize) -> String {
    Mnemonic::generate(word_count)
        .expect("word count not valid")
        .to_string()
}
`,


  "mnemonic_keypair": `
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


  "keypair_bytes_base58": `
use solana_sdk::signature::Keypair;

pub fn from_bytes(bs: &[u8]) -> anyhow::Result<Keypair>{
    Ok(Keypair::from_bytes(bs)?)
}

pub fn from_base58_str(str: &str)-> Keypair {
    Keypair::from_base58_string(str)
}
  `,


  "sign_messages": `
use solana_sdk::signature::{Keypair, Signature};

let keypair = Keypair::new();
let msg = "message..";

let sig: Signature = keypair.sign_message(&msg.as_bytes());
sig.verify(&keypair.pubkey().to_bytes(), &msg.as_bytes());
`
};

export const solanaRustKeyToTitle: { [key: string]: string; } = {
  "random_keypair": 'Random Keypair',
  "gen_mnemonic": "Generate Mnemonic",
  "mnemonic_keypair": "Gen Keypair from mnemonic",
  "keypair_bytes_base58": "Keypair from bytes or base58 string",
  "sign_messages": "Sign and verify Message"
};



export const solanaRustCodeKeys = [
  'random_keypair',
  'gen_mnemonic',
  'mnemonic_keypair',
  "keypair_bytes_base58",
  'sign_messages'
]
