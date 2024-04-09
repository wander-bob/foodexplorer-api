require("dotenv/config");
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();
const routes = require("./routes/");
const knex = require("./database/knex");
const multerConfig = require("./configs/multerConfig");
const AppError = require("./middlewares/AppError");
const port = process.env.SERVER_PORT;

server.use(express.json());
server.use(cookieParser());
server.use(cors({
  origin: ["https://main--admirable-dodol-bf77d4.netlify.app/"],
  credentials: true,
  
}));
server.use("/files", express.static(multerConfig.UPLOAD_FOLDER))
server.use(routes);
knex.migrate.latest().then(()=> knex.seed.run());

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