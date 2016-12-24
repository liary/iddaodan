const Sequelize = require('sequelize');
const sequelize = require('../DB');
const dbUtil = require('../util');

var Directory = sequelize.define('directory', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    parent: Sequelize.STRING,
    name: Sequelize.STRING,
    weight: Sequelize.INTEGER
});

var directory = Directory.sync();

exports.util = {
    add: function(parent, name, weight) {
        return directory.then(async () => {
            var id, obj;
            try {
                obj = await this.find();
                obj = obj.dataValues;
            } catch(err) {
                obj = { }
            }
            if (obj && obj.id) {
                id = parseInt(obj.cid) + parseInt(Math.random()*5%5) + 1;
            } else {
                id = parseInt(Math.random()*5%5);
            }
            Directory.create({
                id: dbUtil.formatId(id.toString(), '1000', 4, '30'),
                parent: parent || '',
                name: name || '',
                weight: weight || ''
            });
        });
    },
    find: function() {
        return Directory.findOne({
            order: [['id', 'DESC']]
        });
    },
    list: function() {
        return Directory.findAll();
    },
    del: function(id) {
        return Directory.destroy({
            where: {
                id: id
            }
        });
    }
}