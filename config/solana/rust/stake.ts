export const solanaRustStakeKeyToCode: { [key: string]: string; } = {
  "get_validators": `
use solana_client::rpc_client::RpcClient;

fn get_validators() {
    let url = "https://api.devnet.solana.com".to_string();
    let rpc_client = RpcClient::new(url);

    let vote_accounts = rpc_client.get_vote_accounts().expect("get vote accounts");

    let current = vote_accounts.current.clone();
    let mut all = vote_accounts.delinquent;
    all.extend(vote_accounts.current..);

    println!("current_validator: {:?}", current);
    println!("all_validators: {:?}", all);
}
`,


  "create_account_and_stake": `
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    signature::Keypair,signer::Signer,
    stake::{
        self, state::{Authorized, Lockup}
    },
    transaction::Transaction
};

fn create_account_and_stake() -> anyhow::Result<()> {
    let url = "https://api.devnet.solana.com".to_string();
    let rpc_client = RpcClient::new(url);
    let blockhash = rpc_client.get_latest_blockhash()?;

    // make sure this account has balance
    let owner = Keypair::new();
    let stake_account = Keypair::new();
    let amount_to_stake = 100_000_000u64;
    let create_stake_account_stake_ix = stake::instruction::create_account(
        &owner.pubkey(),
        &stake_account.pubkey(),
        &Authorized {
            staker: owner.pubkey(),
            withdrawer: owner.pubkey(),
        },
        &Lockup {
            unix_timestamp: 0,
            epoch: 0,
            custodian: owner.pubkey(),
        },
        amount_to_stake,
    );
    let tx = Transaction::new_signed_with_payer(
        &create_stake_account_stake_ix,
        Some(&owner.pubkey()),
        &[&owner, &stake_account],
        blockhash
    );
    let sig = rpc_client.send_and_confirm_transaction(&tx)?;
    print!("sig: {:?}", sig);

    Ok(())
}
`,

};

export const solanaRustStakeKeyToTitle: { [key: string]: string; } = {
  "get_validators": 'Get Validators',
  "create_account_and_stake": "Create Stake Account and Stake",
  // "create_spl_token": "Create SPL Token",
  // "get_spl_associated_token_account": "Get SPL Associated Token Account(PDA)",
  // "mint_spl_token_to_PDA": "Mint SPL Token to Account(PDA)",
  // "get_spl_token_balance": "Get SPL Token Balance",
};


export const solanaRustStakeCodeKeys = [
  'get_validators',
  'create_account_and_stake',
  // 'create_spl_token',
  // 'get_spl_associated_token_account',
  // 'mint_spl_token_to_PDA',
  // "get_spl_token_balance"
]
