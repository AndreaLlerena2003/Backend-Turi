const express = require("express");
const v1UsuarioRouters = require("./v1/routers/UsuarioRouters");
const {executeSqlQuery, executeSqlQueryGet } = require('./database/database'); 
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/UsuarioRouters", v1UsuarioRouters);


app.listen(PORT, () => {
    console.log("Servidor activo en el puerto " + PORT);
});