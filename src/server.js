const express = require("express");
const server = express();
const port = process.env.SERVER_PORT;

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});