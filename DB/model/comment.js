const Sequelize = require('sequelize');
const sequelize = require('../DB');
const dbUtil = require('../util');

var Comment = sequelize.define('comment', {
    cid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    parentCid: Sequelize.STRING,
    postId: Sequelize.STRING,
    uId: Sequelize.STRING,
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    pushTime: Sequelize.INTEGER,
    content: Sequelize.STRING,
    agree: Sequelize.INTEGER,
    disagree: Sequelize.INTEGER
});

var comment = Comment.sync();

// function formatId(str) {
//     if (str.length < 6) {
//         return '10' + '100000'.substr(0, 6-str.length) + str;
//     } else {
//         return '10' + str;
//     }
// }

exports.util = {
    add: function(postId, parentCid, uId, name, photo, content) {
        return comment.then(async () => {
            var id, obj;
            try {
                obj = await this.find();
                obj = obj.dataValues;
            } catch(err) {
                obj = { }
            }
            if (obj && obj.cid) {
                id = parseInt(obj.cid) + parseInt(Math.random()*5%5) + 1;
            } else {
                id = parseInt(Math.random()*5%5);
            }
            Comment.create({
                cid: formatId(id.toString(), '100000', 6, '10'),
                parentCid: parentCid || '',
                uId: uId || '',
                name: name || '',
                photo: photo || '',
                pushTime: parseInt(Date.now() / 1000), 
                content: content,
                agree: 0,
                disagree: 0
            });
        })
    },
    find: function(cid) {
        if (cid) {
            return Comment.findAll({
                where: {
                    cid: cid
                },
                order: [['pushTime', 'DESC']]
            });
        } else {
            return Comment.findOne({
                order: [['pushTime', 'DESC']]                
            });
        }
    }
}