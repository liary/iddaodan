const Sequelize = require('sequelize');
const sequelize = require('../DB');
const Uuid = require('node-uuid');

const Post = sequelize.define('post', {
    pid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    author: Sequelize.STRING,
    title: Sequelize.STRING,
    desc: Sequelize.STRING,
    preView: Sequelize.STRING,
    h: Sequelize.INTEGER,
    w: Sequelize.STRING,
    content: Sequelize.STRING,
    updateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    createTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    category: Sequelize.INTEGER,
    mark: Sequelize.INTEGER
}, {
    timestamps: false
});

var post = Post.sync(); // 同步数据结构，sync({force: boolean, match: reg}) force属性表示首先删除表并重新创建 match设置只重建正则表达式匹配的表

exports.util = {
    add: function(title, content, author, category, mark, desc, preView, w, h) {
        return post.then(function() {
            Post.create({
                pid: 'post-' + Uuid.v1(),
                author: author,
                title: title,
                content: content,
                createTime: Date.now(),
                updateTime: Date.now(),
                category: category || '',
                mark: mark || '',
                desc: desc || '',
                preView: preView || '',
                w: w || '',
                h: h || ''
            });
        })
    },
    list: function(author, offset, listCount, order) {
        if (author) {
            return post.then(function() {
                Post.findAndCountAll({
                    where: {
                        author: author
                    },
                    order: [['createTime', 'DESC']],
                    offset: offset || 0,
                    limit: listCount || 0
                });
            });
        } else {
            return post.then(function() {
                Post.findAndCountAll({
                    order: [['createTime', 'DESC']],
                    offset: offset || 0,
                    limit: listCount || 0
                });
            });
        }
    },
    getOne: function(pid) {
        return post.then(function() {
            Post.findOne({
                where: {
                    pid: pid
                }
            });
        });
    }
}