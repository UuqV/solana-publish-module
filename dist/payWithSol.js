"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payWithSol = void 0;
var web3 = _interopRequireWildcard(require("@solana/web3.js"));
var buffer = _interopRequireWildcard(require("buffer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
window.Buffer = buffer.Buffer;
var payWithSol = exports.payWithSol = function payWithSol(callback, milliLamports, reciever, rpcProvider, errorCallback) {
  window.solana.connect().then(function (userKey) {
    // Connect to cluster
    var connection = function connection() {
      if (rpcProvider) {
        return new web3.Connection(rpcProvider, "confirmed");
      } else {
        return new web3.Connection(web3.clusterApiUrl("mainnet-beta"), "confirmed");
      }
    };
    var web3userKey = new web3.PublicKey(userKey.publicKey);
    var web3reciever = new web3.PublicKey(reciever);

    // Add transfer instruction to transaction
    connection().getLatestBlockhash("finalized").then(function (blockhashObj) {
      var transaction = new web3.Transaction({
        recentBlockhash: blockhashObj.blockhash,
        feePayer: web3userKey
      }).add(web3.SystemProgram.transfer({
        fromPubkey: web3userKey,
        toPubkey: web3reciever,
        lamports: web3.LAMPORTS_PER_SOL * 0.001 * milliLamports
      }));

      // Sign transaction, broadcast, and confirm
      window.solana.signAndSendTransaction(transaction).then(function (res) {
        callback();
      });
    }, function (e) {
      errorCallback(e);
    });
  });
};