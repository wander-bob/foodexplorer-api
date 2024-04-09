const { verify } = require("jsonwebtoken");
const AppError = require("./AppError");
const { secret } = require('../configs/auth').jwt;
const knex = require("../database/knex");

function authObserver(request, response, next){
  const authHeader = request.headers;
  const cookies = authHeader.cookie;
  if(!cookies){
    throw new AppError("Sessão expirada, efetue o login novamente.", 401);
  }
  const cookiesData = cookies.split(";");
  if(!cookiesData){
    throw new AppError("Sessão expirada, efetue o login novamente.", 401);
  }
  const [, token] = cookiesData[0].split("token=");
  if(!token){
    throw new AppError("Sessão expirada, efetue o login novamente.", 401);
  }
  const  { sub: user_id } = verify(token, secret);
  const user = knex("users").where("id", user_id).first();
  if(!user){
    throw new AppError("Sessão expirada, efetue o login novamente.", 401);
  }
  next();
}
module.exports = authObserver;