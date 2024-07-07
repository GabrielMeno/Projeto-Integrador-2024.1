const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1234'; 

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log("Hash gerado:", hash);
    });
});