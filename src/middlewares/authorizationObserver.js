const { verify } = require("jsonwebtoken");
const AppError = require("./AppError");
const { secret } = require('../configs/auth').jwt;

function authorizationObserver(roles){
  return (request, response, next)=>{
    const {cookie} = request.headers;
    const cookiesList = cookie.split(";");
    const [,token] = cookiesList[0].split("=");
    const { role } = verify(token, secret);
    if(!roles.includes(role)){
      throw new AppError("Acesso não autorizado", 401);
    }
    next();
  }
}
module.exports = authorizationObserver;