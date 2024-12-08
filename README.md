# payWithSol

A quick way to accept solana payments for your content.

## Development usage

Build this library using the [`yarn` package manager](https://yarnpkg.com/).

### Clone the project:

```
git clone git@github.com:UuqV/solana-publish-module.git
```

### Install dependencies:

```
cd solana-publish-module
yarn install
```

### Build the library

```
yarn build
```

Find the library file as `dist/payWithSol.js`.
The file, `dist/index.js` contains one example for including the library in
your project.

### Use the library in another project

There are various ways to do this. From [this answer on StackOverflow][soi]
and using [npm][npm] with [Webpack][wp]:

[soi]: https://stackoverflow.com/a/38417065
[wp]: https://webpack.js.org/
[npm]: https://www.npmjs.com/

```
cd <your project>
npm install --save <relative path to this project>
```

Then, where needed in your project's javascript,

```
import { payWithSol } from "solana-publish";
```

## Library usage

`payWithSol()` can be used to connect to phantom and complete a solana transaction.

- `callback`: The function to call after the transaction is signed. This closes our paywall.
- `milliLamports`: The price to charge the user in "milli-lamports" (.001 SOL), approximately 10 cents (for now)
- `reciever`: The public key of the wallet to send payment to. Should be passed from an environment variable wherever your site's deployed.
- `rpcProvider`: (Optional) Alternative RPC provider

