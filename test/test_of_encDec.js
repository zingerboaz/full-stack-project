var crypto = require("../utils/encryptUtil.js");

var token = "Avi||myId||MyEmail||MyTime||767868768";

var enc = crypto.getEncrypt(token);
console.log(enc);

var dec = crypto.getDecrypt(enc);
console.log(dec);

console.log();

var hash = crypto.cryptPassword("Avi123");
console.log("hash: " + hash);
console.log("try Avi12: " + crypto.compare("Avi12", hash));
console.log("try Avi123: " + crypto.compare("Avi123", hash));