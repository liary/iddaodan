const Sequelize = require('sequelize');
const sequelize = require('../DB');
const dbUtil = require('../util');

var Mark = sequelize.define('mark', {
    mid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    weight: Sequelize.INTEGER,
    name: Sequelize.STRING,
    createTime: Sequelize.INTEGER
}, {
    timestamps: false
});

var mark = Mark.sync();

exports.util = {
    add: function(name, weight) {
        return mark.then(async () => {
            var obj, id;
            try {
                obj = await this.find();
                obj = obj.dataValues;
            } catch(err) {
                obj = { };
            }
            if (obj && obj.mid) {
                id = parseInt(obj.mid) + parseInt(Math.random()*5%5) + 1;
            } else {
                id = parseInt(Math.random()*5%5);
            }
            Mark.create({
                mid: dbUtil.formatId(id.toString(), '100000', 6),
                weight: weight || 0,
                name: name,
                createTime: parseInt(Date.now() / 1000)
            });
        });
    },
    list: function(orderType) {
        var oderType = orderType || 'DESC';
        return Mark.findAll({
            order: [['weight', orderType]]
        });
    },
    find: function(mid) {
        if (mid) {
            return Mark.findAll({
                where: {
                    mid: mid
                }
            });
        } else {
            return Mark.findOne({
                order: [['mid', 'DESC']]
            });
        }
    }
}