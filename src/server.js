const app = require("./app");
const knex = require("knex");
const { PORT, DATABASE_URL } = require("./config");

console.log("db server url: ",DATABASE_URL)
const db = knex({
  client: "pg",
  connection: DATABASE_URL,
  pool:{
    propagateCreateError:false
  }
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})




