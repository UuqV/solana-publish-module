A quick way to accept solana payments for your content.

`payWithSol()` can be used to connect to phantom and complete a solana transaction.

- `callback`: The function to call after the transaction is signed. This closes our paywall.
- `milliLamports`: The price to charge the user in "milli-lamports" (.001 SOL), approximately 10 cents (for now)
- `reciever`: The public key of the wallet to send payment to. Should be passed from an environment variable wherever your site's deployed.
- `rpcProvider`: (Optional) Alternative RPC provider
- `errorCallback`: Optional error handling callback

`payWithSolSplit()` works the same way but splits the payment between two recipients in a single atomic transaction (one signature, both transfers succeed or fail together).

- `callback`: The function to call after the transaction is signed.
- `milliLamportsA`: The amount to send to the first recipient, in milli-lamports (.001 SOL).
- `recieverA`: The public key of the first recipient wallet.
- `milliLamportsB`: The amount to send to the second recipient, in milli-lamports (.001 SOL).
- `recieverB`: The public key of the second recipient wallet.
- `rpcProvider`: (Optional) Alternative RPC provider
- `errorCallback`: Optional error handling callback
