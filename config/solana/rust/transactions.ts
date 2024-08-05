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


  "create_spl_token": `
use solana_client::rpc_client::RpcClient;
use solana_sdk::program_pack::Pack;
use solana_sdk::signature::Keypair;
use solana_sdk::signer::Signer;
use solana_sdk::system_instruction;
use solana_sdk::transaction::Transaction;
use spl_token::state::Mint;
use spl_token::{id, instruction};

fn create_spl_token() -> anyhow::Result<()> {
    let url = "https://api.devnet.solana.com".to_string();
    let rpc_client = RpcClient::new(url);

    let blockhash = rpc_client.get_latest_blockhash()?;

    let mint_account = Keypair::new();
    let owner = Keypair::new();
    let token_program = &id();
    let mint_rent = rpc_client.get_minimum_balance_for_rent_exemption(Mint::LEN)?;

    // create token-mint account
    let token_mint_account_ix = system_instruction::create_account(
        &owner.pubkey(),
        &mint_account.pubkey(),
        mint_rent,
        Mint::LEN as u64,
        token_program,
    );
    // initialize token-mint account
    let token_mint_ix = instruction::initialize_mint(
        token_program,
        &mint_account.pubkey(),
        &owner.pubkey(),
        None,
        9,
    )
    .expect("token mint instruction");

    let mint_tx = Transaction::new_signed_with_payer(
        &[token_mint_account_ix, token_mint_ix],
        Some(&owner.pubkey()),
        &[&owner, &mint_account],
        blockhash,
    );

    let sig = rpc_client.send_and_confirm_transaction(&mint_tx)?;
    print!("tx hash: {:?}", sig);
    Ok(())
}
`,

  "get_spl_associated_token_account": `
spl_associated_token_account::get_associated_token_address(&receiver_account.pubkey(), &mint_account.pubkey());
  `,


  "mint_spl_token_to_PDA": `
use solana_client::rpc_client::RpcClient;
use solana_sdk::signature::Keypair;
use solana_sdk::signer::Signer;
use solana_sdk::transaction::Transaction;
use spl_token::{id, instruction};

fn mint_to_spl_token()-> anyhow::Result<()> {
    let url = "https://api.devnet.solana.com".to_string();
    let rpc_client = RpcClient::new(url);

    let blockhash = rpc_client.get_latest_blockhash()?;

    // make mint_account and owner same to previous code-block
    let mint_account = Keypair::new();
    let owner = Keypair::new();
    let token_program = &id();

    let receiver_account = Keypair::new();

    // create PDA of receiver_account
    let associated_token_account = spl_associated_token_account::get_associated_token_address(&receiver_account.pubkey(), &mint_account.pubkey());
    let assoc_ix = spl_associated_token_account::instruction::create_associated_token_account(
        &owner.pubkey(),
        &receiver_account.pubkey(),
        &mint_account.pubkey(),
        token_program
    );

    // mint spl token to PDA
    let mint_amount = 10u64;
    let mint_to_ix = instruction::mint_to(
        token_program,
        &mint_account.pubkey(),
        &associated_token_account,
        &owner.pubkey(),
        &[&owner.pubkey()],
        mint_amount,
    )
        .expect("mint ix");

    let mint_tx = Transaction::new_signed_with_payer(
        &[assoc_ix, mint_to_ix],
        Some(&owner.pubkey()),
        &[&owner],
        blockhash,
    );

    let sig = rpc_client.send_and_confirm_transaction(&mint_tx)?;
    print!("sig: {:?}", sig);
    
    Ok(())
}
  `,

  "get_spl_token_balance": `
use solana_client::rpc_client::RpcClient;
use solana_sdk::program_pack::Pack;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signer::Signer;
use spl_token::state::Account;

fn get_spl_token_balance(mint_account: Pubkey, receiver_account: Pubkey) -> anyhow::Result<u64> {
    let url = "https://api.devnet.solana.com".to_string();
    let rpc_client = RpcClient::new(url);

    let associated_token_account = spl_associated_token_account::get_associated_token_address(&receiver_account.pubkey(), &mint_account.pubkey());

    let pda = rpc_client.get_account(&associated_token_account)?;
    let data = Account::unpack(&pda.data).expect("unpack account.data");
    println!("data: {:?}", data);

    Ok(data.amount)
}
  `
};

export const solanaRustTxKeyToTitle: { [key: string]: string; } = {
  "send_sol": 'Transfer Sol',
  "create_spl_token": "Create SPL Token",
  "get_spl_associated_token_account": "Get SPL Associated Token Account(PDA)",
  "mint_spl_token_to_PDA": "Mint SPL Token to Account(PDA)",
  "get_spl_token_balance": "Get SPL Token Balance",
};


export const solanaRustTxCodeKeys = [
  'send_sol',
  'create_spl_token',
  'get_spl_associated_token_account',
  'mint_spl_token_to_PDA',
  "get_spl_token_balance"
]
