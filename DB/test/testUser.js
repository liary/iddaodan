var user = require('../model/user');

//add: function(name, phone, mail, desc, sex, age, password, photo, w, h)
var name = 'name' + parseInt(Math.random()*10%10);
// user.util.add(name, 15312312322, 'limama@mail.com', 'ddf', 1, 24, '525100').then(function(p) {
//     console.log(p);
// });
user.util.detail('user-0c1cf480-c36b-11e6-9358-bbd6c3c0217a').then(function(p) {
    console.log(p.dataValues)
});
var obj = async () => {
    return await user.util.detail('user-0c1cf480-c36b-11e6-9358-bbd6c3c0217a').dataValues;
}
console.log(obj)