import * as web3 from "@solana/web3.js";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const payWithSol = (
  callback,
  milliLamports,
  reciever,
  rpcProvider,
  errorCallback
) => {
  window.solana.connect().then(function (userKey) {
    // Connect to cluster
    var connection = () => {
      if (rpcProvider) {
        return new web3.Connection(rpcProvider, "confirmed");
      } else {
        return new web3.Connection(
          web3.clusterApiUrl("mainnet-beta"),
          "confirmed"
        );
      }
    };

    var web3userKey = new web3.PublicKey(userKey.publicKey);
    var web3reciever = new web3.PublicKey(reciever);

    // Add transfer instruction to transaction
    connection()
      .getLatestBlockhash("finalized")
      .then(
        (blockhashObj) => {
          var transaction = new web3.Transaction({
            recentBlockhash: blockhashObj.blockhash,
            feePayer: web3userKey,
          }).add(
            web3.SystemProgram.transfer({
              fromPubkey: web3userKey,
              toPubkey: web3reciever,
              lamports: web3.LAMPORTS_PER_SOL * 0.001 * milliLamports,
            })
          );

          // Sign transaction, broadcast, and confirm
          window.solana.signAndSendTransaction(transaction).then((res) => {
            callback();
          });
        },
        (e) => {
          errorCallback(e);
        }
      );
  });
};

const payWithSolSplit = (
  callback,
  milliLamportsA,
  recieverA,
  milliLamportsB,
  recieverB,
  rpcProvider,
  errorCallback
) => {
  window.solana.connect().then(function (userKey) {
    var connection = () => {
      if (rpcProvider) {
        return new web3.Connection(rpcProvider, "confirmed");
      } else {
        return new web3.Connection(
          web3.clusterApiUrl("mainnet-beta"),
          "confirmed"
        );
      }
    };

    var web3userKey = new web3.PublicKey(userKey.publicKey);
    var web3recieverA = new web3.PublicKey(recieverA);
    var web3recieverB = new web3.PublicKey(recieverB);

    connection()
      .getLatestBlockhash("finalized")
      .then(
        (blockhashObj) => {
          var transaction = new web3.Transaction({
            recentBlockhash: blockhashObj.blockhash,
            feePayer: web3userKey,
          })
            .add(
              web3.SystemProgram.transfer({
                fromPubkey: web3userKey,
                toPubkey: web3recieverA,
                lamports: web3.LAMPORTS_PER_SOL * 0.001 * milliLamportsA,
              })
            )
            .add(
              web3.SystemProgram.transfer({
                fromPubkey: web3userKey,
                toPubkey: web3recieverB,
                lamports: web3.LAMPORTS_PER_SOL * 0.001 * milliLamportsB,
              })
            );

          window.solana.signAndSendTransaction(transaction).then((res) => {
            callback();
          });
        },
        (e) => {
          errorCallback(e);
        }
      );
  });
};

export { payWithSol, payWithSolSplit };
