var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("123123", salt);
// Store hash in your password DB.\

console.log(hash)

console.log(bcrypt.compareSync('321321', hash))