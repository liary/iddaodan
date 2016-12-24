const crypto = require('crypto');

var salt, _password, password='3ssss33';
    try {
        salt = crypto.randomBytes(parseInt(Math.random()*10)+9)
    } catch(err) {
        console.log(err)
    }
    try {
        _password = crypto.pbkdf2Sync(password, salt, 4096, 100).toString('hex')
    } catch(err) {
        console.log(err)
    }
console.log(_password.length + '   ' + _password)