const fs = require("fs");
const callfile = require('child_process');

const exec = require('child_process').exec;
const Ccompiler = () => {
  exec ('g++ test.c -o test', function(err, stdout, stderr) {
    if(err) {
      console.log(err);

    } else {
      console.log(stdout);
      exec('./test', function(err, stdout, stderr) {
        console.log(err),
          console.log(stdout);
      })
    }
  })
}
Ccompiler();

// exec('gcc test.c &2>1 test.out', function(err, stdout, stderr){
//   if(err) {
//     console.log('Compiler error:');
//     console.log(stderr);
//   } else {
//     exec('./test', function(err, stdout, stderr) {
//       if(err) {
//         console.log('Runtime error:');
//         console.log(stderr);
//       }
//       else {
//         console.log('Program Input:');
//         var data = stdout;
//         console.log(stdout);
//       }
//     });
//   }
// });

// 异步读取文件
fs.readFile('test.c', function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取: " + data.toString());
});
