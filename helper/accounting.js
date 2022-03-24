const accounting = require('accounting-js');

function mvp (input) {
   return accounting.formatMoney(input, {symbol: "Rp.", thousand: ".", precision: 0});
}

module.exports = mvp;