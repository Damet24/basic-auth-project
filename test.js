const bcrypt = require('bcrypt')

console.log(bcrypt.hashSync('Password@123', 10))
