const express = require("express");
const v1UsuarioRouters = require("./v1/routers/UsuarioRouters");
const v1DocumentoRouters = require("./v1/routers/DocumentoRouters");
const v1CategoriaRouters = require("./v1/routers/CategoriaRouters");
const v1CategoriaLugarRouters = require("./v1/routers/CategoriaLugarRouter")
const {executeSqlQuery, executeSqlQueryGet } = require('./database/database'); 
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/UsuarioRouters", v1UsuarioRouters);
app.use("/api/v1/DocumentoRouters", v1DocumentoRouters);
app.use("/api/v1/CategoriaRouters", v1CategoriaRouters);


app.listen(PORT, () => {
    console.log("Servidor activo en el puerto " + PORT);
});