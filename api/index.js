const express = require("express");
const config = require("config");
const catsRouter = require("./routes/cats/index");
const app = express();
const sequelize = require('./dao/configDB');
const listen_port = config.get("app.listen_port");
app.use(express.json());

sequelize.sync({ force: true }).then(() => console.log('db is ready'));

app.use("/api/cats", catsRouter)

app.listen(listen_port, ()=>console.log("Listening on", listen_port));