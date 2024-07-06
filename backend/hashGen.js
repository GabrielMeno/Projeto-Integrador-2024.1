const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1234'; // Substitua 'sua_nova_senha' pela senha real

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Agora você pode salvar 'hash' no banco de dados
        console.log("Hash gerado:", hash);
    });
});