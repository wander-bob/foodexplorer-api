const express = require("express");
const server = express();
const port = process.env.SERVER_PORT;
const AppError = require("./middlewares/AppError");

server.use((error, request, response, next) => {
  console.log(error);
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      message: error.message,
    });
  };
  response.status(500).json({
    message: "Erro interno do servidor."
  })
});
server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});