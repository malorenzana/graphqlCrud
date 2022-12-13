const jwt = require("jsonwebtoken"); //decodificar el token

//usando el token 
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; //obteniendo el token del header

    try {
        const verified = jwt.verify(token, 'secretsign')   // decodificando el token
        req.verifiedUser = verified.user  //almacena el dato del usuario
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    authenticate
}