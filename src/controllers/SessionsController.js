const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../middlewares/AppError");
const {expiresIn, secret} = require("../configs/auth").jwt;

class SessionsController {
  async create(request, response){
    const { email, password } = request.body;
    const user = await knex("users").where("email", email).first();
    if(!user){
      throw new AppError("Usuário e/ou senha inválidos", 401);
    }
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      throw new AppError("Usuário e/ou senha inválidos", 401);
    }
    const token = sign({role: user.role}, secret, {subject: String(user.id), expiresIn});
    
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000
    })
    return response.status(201).json({user: {name: user.name, email: user.email, role: user.role}})    
  }
}
module.exports = SessionsController;