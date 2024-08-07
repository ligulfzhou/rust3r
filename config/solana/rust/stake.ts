export const solanaRustStakeKeyToCode: { [key: string]: string; } = {
  "get_validators": `
use solana_client::rpc_client::RpcClient;

fn main() {
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


//   "create_spl_token": `
// `,
//
//   "get_spl_associated_token_account": `
// `,
//
//
//   "mint_spl_token_to_PDA": `
// `,
//
//   "get_spl_token_balance": `
// `
};

export const solanaRustStakeKeyToTitle: { [key: string]: string; } = {
  "get_validators": 'Get Validators',
  // "create_spl_token": "Create SPL Token",
  // "get_spl_associated_token_account": "Get SPL Associated Token Account(PDA)",
  // "mint_spl_token_to_PDA": "Mint SPL Token to Account(PDA)",
  // "get_spl_token_balance": "Get SPL Token Balance",
};


export const solanaRustStakeCodeKeys = [
  'get_validators',
  // 'create_spl_token',
  // 'get_spl_associated_token_account',
  // 'mint_spl_token_to_PDA',
  // "get_spl_token_balance"
]
