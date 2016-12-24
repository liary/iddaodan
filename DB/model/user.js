const Sequelize = require('sequelize');
const sequelize = require('../DB');
const Uuid = require('node-uuid');
const crypto = require('crypto');

var User = sequelize.define('user', {
    uid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: Sequelize.STRING,
    phone: Sequelize.INTEGER(11),
    mail: Sequelize.STRING,
    desc: Sequelize.STRING,
    sex: Sequelize.INTEGER,
    age: Sequelize.INTEGER(3),
    right: Sequelize.INTEGER(2),
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    photo: Sequelize.STRING,
    w: Sequelize.STRING,
    h: Sequelize.STRING
}, {
    timestamps: false
});

var user = User.sync();

exports.util = {
    add: function(name, phone, mail, desc, sex, age, password, photo, w, h) {
        var salt, _password;
        try {
             salt = crypto.randomBytes(parseInt(Math.random()*10)+9)
        } catch(err) {
            return err;
        }
        try {
            _password = crypto.pbkdf2Sync(password, salt, 4096, 100).toString('hex')
        } catch(err) {
            return err;
        }
        return user.then(function() {
            User.create({
                uid: 'user-' + Uuid.v1(),
                name: name,
                mail: mail || '',
                desc: desc || '',
                sex: sex || 0,
                age: age || 13,
                right: 1,
                password: _password,
                salt: salt,
                photo: photo || '',
                w: w || '',
                h: h || ''
            });
        });
    },
    // list: function() {

    // },
    // edit: function(uid, name, phone, mail, desc, sex, age, password) {
    //     var orignal = this.detail(uid);
    //     if ()
    //     var value = {
    //         name: name,
    //         mail: mail || '',
    //         desc: desc || '',
    //         sex: sex || 0,
    //         age: age || 13,
    //         right: 1,
    //         password: _password,
    //         salt: salt,
    //         photo: photo || ',
    //         w: w || '',
    //         h: h || ''
    //     }
    // },
    // editRight: function(uid, right) {

    // },
    del: function(uid) {
        return User.destory({
            where: {
                uid: uid
            },
            limit: 1
        })
    },
    detail: function(uid) {
        return User.findById(uid);        
    }
}