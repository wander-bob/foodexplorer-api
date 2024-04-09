module.exports = {
  jwt: {
    secret: process.env.SERVER_SECRET,
    expiresIn: "1d"
  }
}