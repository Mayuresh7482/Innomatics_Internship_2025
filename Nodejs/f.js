// studentdetials={
//       name:"Raj",
//       age:20,
//       grade:"A"

// }

// function smart(){
//       console.log("I am smart");
//       return true;
// }
// function hard(){
//       console.log("I am hardworking");
// }

// module.exports={studentdetials, smart, hard};

// const os=require("os");
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.type());
// console.log(os.userInfo());
// console.log(os.version());
// console.log(os.uptime());
// console.log(os.release());
// console.log(os.tmpdir());
// module.exports=os;

// const { log } = require("console");
// const path = require("path");
// const a = path.basename("C:UsersacerOneDriveDesktophappyholi.mp4");
// const b = path.extname("C:UsersacerOneDriveDesktophappyholi.mp4");

// console.log(a);
// console.log(b);
// console.log(__dirname);

const http = require("http");
const port = 4000;
const server = http.createServer((req, res) => {
  console.log(req.url);
  // res.write(req.url);
  if (req.url === "/about") {
    res.end("About page"); // res.end is used to send the response to the client
  } else if (req.url === "/contact") {
    res.end("Contact page");
  } else if (req.url === "/") {
    res.end("Home page");
  } else {
    res.end("404 not found");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
