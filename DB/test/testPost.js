var post = require('../model/post');

console.log(post)
//add: function(title, content, author, category, mark)
var title = 'test' + Math.random()*10%10;
post.util.add(title, 'this is a new article', 'limama', 123, 2).then(function(p) {
    console.log(p);
});