const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Por favor, autentíquese con un token válido" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            return res.status(401).send({ errors: "Por favor, autentíquese con un token válido" });
        }
    }
}

module.exports = verifyToken;