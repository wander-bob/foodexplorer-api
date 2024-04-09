require("dotenv/config");
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();
const routes = require("./routes/");
const multerConfig = require("./configs/multerConfig");
const AppError = require("./middlewares/AppError");
const port = process.env.SERVER_PORT;

server.use(express.json());
server.use(cookieParser());
server.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  
}));
server.use("/files", express.static(multerConfig.UPLOAD_FOLDER))
server.use(routes);

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