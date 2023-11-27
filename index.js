const express = require("express");
const v1UsuarioRouter = require("./v1/routers/UsuarioRouters");
const v1DocumentoRouter = require("./v1/routers/DocumentoRouters");
const v1CategoriaRouter = require("./v1/routers/CategoriaRouters");
const v1CategoriaLugarRouter = require("./v1/routers/CategoriaLugarRouter");
const v1FavoritoRouter = require("./v1/routers/FavoritoRouter");
const v1LugarRecomendadoRouter = require("./v1/routers/LugarRecomendadoRouter");
const v1ViajeRouter = require("./v1/routers/ViajeRouter");
const v1ViajeLugarRouter = require("./v1/routers/ViajeLugarRouter");
const v1LugarRouter = require("./v1/routers/LugarRouter");
const v1ReseñaRouter = require("./v1/routers/ReseñaRouter");
const v1DistritoRouter = require("./v1/routers/DistritoRouter");
const v1CategoriaPadreRouter = require("./v1/routers/CategoriaPadreRouter");
const v1PreguntasRouter = require("./v1/routers/PreguntasRouter");


const {executeSqlQuery, executeSqlQueryGet,executeSqlQueryWithGet } = require('./database/database'); 
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/UsuarioRouters", v1UsuarioRouter);
app.use("/api/v1/DocumentoRouters", v1DocumentoRouter);
app.use("/api/v1/CategoriaRouters", v1CategoriaRouter);
app.use("/api/v1/CategoriaLugarRouters",v1CategoriaLugarRouter);
app.use("/api/v1/FavoritoRouter",v1FavoritoRouter);
app.use("/api/v1/LugarRecomendadoRouter",v1LugarRecomendadoRouter);
app.use("/api/v1/ViajeRouter",v1ViajeRouter);
app.use("/api/v1/ViajeLugarRouter",v1ViajeLugarRouter);
app.use("/api/v1/LugarRouter",v1LugarRouter);
app.use("/api/v1/ResenaRouter",v1ReseñaRouter);
app.use("/api/v1/DistritoRouter",v1DistritoRouter);
app.use("/api/v1/CategoriaPadreRouter",v1CategoriaPadreRouter);
app.use("/api/v1/PreguntasRouter",v1PreguntasRouter);



app.listen(PORT, () => {
    console.log("Servidor activo en el puerto " + PORT);
});