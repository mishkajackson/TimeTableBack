module.exports = {
  HOST: process.env.HOSTNAME,
  PORT: process.env.PORT || 3306,
  USER: process.env.DBUSER,
  PASSWORD: process.env.DBPASSWORD,
  DB: process.env.DB
};