var mark = require('../model/mark');

//add: function(name, weight)
var name = 'mark' + parseInt(Math.random()*10%10);
mark.util.add(name, 12).then(function(p) {
    console.log('ww');
});
// user.util.detail('user-0c1cf480-c36b-11e6-9358-bbd6c3c0217a').then(function(p) {
//     console.log(p.dataValues)
// });
// var obj = async () => {
//     return await user.util.detail('user-0c1cf480-c36b-11e6-9358-bbd6c3c0217a').dataValues;
// }
// console.log(obj)