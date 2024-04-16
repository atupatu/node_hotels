// var add = (a,b) =>{
//     return a+b;
// }
// //arrow

// var result = add(2,5)
// console.log(result);

// //callback

// function callback()
// {
//     console.log("This is a callback function");
// }

// const sum = function(a,b, callback)
// {
//     var result = a+b;
//     console.log(result);
//     callback();
// }

// sum(10,4,callback)

//shorter way to write callback


// const sum = function(a,b ,atharva)
// {
//     var result = a+b;
//     console.log(result);
//     atharva();
// }

// sum(2,3,function()
// {
//     console.log("THe callback function is executed");
// })

// sum(2 , 3 , ()=> {console.log("The callback function is executed")});

//OS and FS

// var fs = require('fs');
// var os = require('os');


// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('hi.txt','Hi'+user.username+'!\n',()=>{
//     console.log('File is created!!!');
// })

// const notes = require('./notes.js');

// var num = notes.num;
// console.log(num);

var _ = require('lodash');


var data = ['person','person',1,2,1,22,'name'];

var filter = _.uniq(data);
console.log(filter);
