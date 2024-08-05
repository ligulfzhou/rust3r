export const solanaRustTxKeyToCode: { [key: string]: string; } = {
  "send_sol": `
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    pubkey::Pubkey,
    signature::{Keypair, Signer},
    system_instruction,
    transaction::Transaction
};

pub fn send_sol(from_kp: Keypair, to: &Pubkey, lamports: u64) -> anyhow::Result<()> {
    let url = "https://api.devnet.solana.com".to_string();
    let rpc_client = RpcClient::new(url);

    let blockhash = rpc_client.get_latest_blockhash()?;

    let transfer_ix = system_instruction::transfer(&from_kp.pubkey(), to, lamports);
    let transfer_tx = Transaction::new_signed_with_payer(
        &[transfer_ix],
        Some(&from_kp.pubkey()),
        &[&from_kp],
        blockhash
    );

    let signature = rpc_client.send_transaction(&transfer_tx)?;
    let statuses = rpc_client.get_signature_statuses(&[signature])?.value;
    println!("status: {:?}", statuses);

    Ok(())
}
  `,



  "send_spl_token": `
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

pub fn from_base58_str(str: &str)-> anyhow::Result<Keypair> {
    Ok(Keypair::from_base58_string(str))
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

export const solanaRustTxKeyToTitle: { [key: string]: string; } = {
  "send_sol": 'Transfer Sol',
  "send_spl_token": "Transfer SPL Token",
  "mnemonic_keypair": "Gen Keypair from mnemonic",
  "keypair_bytes_base58": "Keypair from bytes or base58 string",
  "sign_messages": "Sign and verify Message"
};



export const solanaRustTxCodeKeys = [
  'send_sol',
  'send_spl_token'
]
