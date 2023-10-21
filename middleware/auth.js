const jwt = require('jsonwebtoken');
const config = require('../database/config');
const secretKey = config.secretKey;

const verifyToken = (token) => {
    if (!token) {
        return { error: 'Token no proporcionado' };
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return { decoded };
    } catch (err) {
        return { error: 'Token no válido' };
    }
};

module.exports = verifyToken;

//const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6IkFuZHJlYSIsImV4cCI6MTY5Nzg1NTg2NiwiaWF0IjoxNjk3ODQ1MDY3fQ.O6DDXq4UYBVzBT2yufiltDSx94zY8fBKsjQ6ZlfWdtQ';
//const resultValid = verifyToken(validToken);
//console.log(resultValid);


//const emptyToken = '';
//const resultEmpty = verifyToken(emptyToken);
//console.log(resultEmpty);


//const invalidToken = 'token_invalido';
//const resultInvalid = verifyToken(invalidToken);
//console.log(resultInvalid);
