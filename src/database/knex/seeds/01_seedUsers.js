const {hash} = require("bcryptjs");
const {users} = require("../../db-example.json")
exports.seed = async function(knex) {
  async function updateUser(user){
    user.password = await hash(user.password, 8);
    return user;
  };
  const updatedUsers = await Promise.all(users.map(async (user)=>{
    await updateUser(user);
    return user;
  }))
  await knex('users').del()
  await knex('users').insert(updatedUsers);
};
