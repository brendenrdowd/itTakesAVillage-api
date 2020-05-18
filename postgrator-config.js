require("dotenv").config();
<<<<<<< HEAD
module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  connectionString:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  ssl: !!process.env.SSL,
=======

module.exports = {
    migrationDirectory: "migrations",
    driver: "pg",
    connectionString:
        process.env.NODE_ENV === "test"
            ? process.env.TEST_DATABASE_URL
            : process.env.DATABASE_URL,
    ssl: !!process.env.SSL,
>>>>>>> 14f12517446995266bfc9b18d3db966def7cc5ea
};
