require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString" : "tcp://postgres@localhost/itavv",
  "ssl": !!process.env.SSL,
}