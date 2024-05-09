const {hash, compare} = require("bcryptjs");
const AppError = require("../middlewares/AppError");
const knex = require("../database/knex");

class UserController {
  async create(request, response){
    const {name, email, password} = request.body;
    if(String(password).length < 6){
      throw new AppError("A senha precisa ter ao menos 6 caracteres.")
    }
    const passwordHashed = await hash(password, 8);
    try {
      const [{id}] = await knex("users").returning("id").insert({name, email, password: passwordHashed});
      return response.status(201).json({
        message: "Usuário criado com sucesso!",
        user: {id: id}
      });
    } catch (error) {
      const [,parsedMessage] = String(error).split("SQLITE_CONSTRAINT: ");
      if(parsedMessage.includes("UNIQUE")){
        throw new AppError("O e-mail informado já está cadastrado.")
      }else{
        throw new AppError("Erro interno do servidor.", 500)
      }
    }
  }
  async update(request, response){
    const { name, email, old_password, new_password} = request.body;
    const user = await knex("users").where({email}).first();
    if(!user){
      throw new AppError("Sessão inválida.", 401);
    } 
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    if(new_password && !old_password){
      throw new AppError("Você precisa confirmar a senha anterior para a atualização");
    }
    if(new_password && old_password){
      const isOldPasswordValid = await compare(old_password, user.password);
      if(!isOldPasswordValid){
        throw new AppError("A senha antiga informada é inválida.")
      }
      user.password = await hash(new_password, 8);
    }
    await knex("users").update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.raw(`(datetime('now', 'localtime'))`)
    }).where({email});
    return response.json({message: "Usuário atualizado!"})
  }
}
module.exports = UserController;