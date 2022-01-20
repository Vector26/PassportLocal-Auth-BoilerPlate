const crypto = require('crypto');

// TODO
function validPassword(password, hash, salt) {
    var cHash= crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
    return hash===cHash;
}
function genPassword(password) {
    var salt= crypto.randomBytes(32).toString('hex');
    var hash= crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');

    return {
        salt,
        hash
    }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;