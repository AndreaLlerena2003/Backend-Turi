const { Connection, Request } = require('tedious');

// configuramos la conexión a la base de datos


const config = {
  server: 'MSI',
  authentication: {
    type: 'default',
    options: {
      userName: 'alejandra',
      password: '12345',
    },
  },
  options: {
    port: 1433,
    database: 'Turi',
    trustServerCertificate: true,
  },
};

const connection = new Connection(config);
connection.connect();

// se prueba la conexión
connection.on('connect', (err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err.message);
  } else {
    console.log("Se logró una buena conexión :)");
  }
});


//FUNCIONQ QUE NOS PERMITE HACER GET A NUESTRAS QUERYS SQL
function executeSqlQueryGet(sqlQuery, callback) {
  const request = new Request(sqlQuery, (err, rowCount) => {
    if (err) {
      callback(err);
    }
  });

  const resultados = []; // almacenamos todas las filas de resultados

  request.on('row', (columns) => {
    const rowData = {}; // objeto para almacenar los datos de la fila

    columns.forEach((column) => {
      rowData[column.metadata.colName] = column.value;
    });

    resultados.push(rowData);
  });

  request.on('requestCompleted', () => {
    callback(null, resultados);
  });

  request.on('error', (err) => {
    callback(err);
  });

  connection.execSql(request);
}

//FUNCIO QUE NOS PERMITE HACER POST A NUESTRAS SQL QUERYS
function executeSqlQuery(sqlQuery, callback) {
  const request = new Request(sqlQuery, (err, rowCount) => {
    if (err) {
      callback(err);
    } else {
      console.log("Filas afectadas:", rowCount);
    }
    callback(err, rowCount);
  });

  request.on('row', (columns) => {
    console.log(columns);
  });

  connection.execSql(request);
}

//FUNCION QUE NOS PERMITE HACER POST DE NUESTRAS QUERYS OBTENIENDO UN GET COMO RESPUESTA
function executeSqlQueryWithGet(sqlQuery, callback) {
  const request = new Request(sqlQuery, (err, rowCount) => {
    if (err) {
      callback(err);
    }
  });

  const resultados = [];

  request.on('row', (columns) => {
    const rowData = {};

    columns.forEach((column) => {
      rowData[column.metadata.colName] = column.value;
    });

    resultados.push(rowData);
  });

  request.on('requestCompleted', () => {
    callback(null, resultados);
  });

  request.on('error', (err) => {
    callback(err);
  });

  connection.execSql(request);
}

module.exports = {
  executeSqlQueryWithGet,
  executeSqlQuery,
  executeSqlQueryGet,
  
};