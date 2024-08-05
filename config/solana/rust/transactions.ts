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
        blockhash,
    );

    let signature = rpc_client.send_transaction(&transfer_tx)?;
    let statuses = rpc_client
        .get_signature_statuses(&[signature])?
        .value
        .into_iter()
        .filter_map(|status| status)
        .collect::<Vec<_>>();
    println!("status: {:?}", statuses);

    Ok(())
}
  `,



  "send_spl_token": `
  
  
  
`,

};

export const solanaRustTxKeyToTitle: { [key: string]: string; } = {
  "send_sol": 'Transfer Sol',
  "send_spl_token": "Transfer SPL Token",
};



export const solanaRustTxCodeKeys = [
  'send_sol',
  'send_spl_token'
]
