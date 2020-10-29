const jwt = require('jsonwebtoken');


const JWTValidate = (req, res, next) => {

    try {

        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No existe token'
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRET_JWT);

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}



module.exports = {
    JWTValidate
}