const jwt = require('jsonwebtoken')

//creando token 
const createJWTToken = user => {
    return jwt.sign({ user }, 'secretsign', {
        expiresIn: '24h'

    })
};

module.exports = {
    createJWTToken
}