const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

const AdminRoleValidate = async(req, res, next) => {

    const uid = req.uid;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        if (userDB.role !== 'ADMIN_ROLE') {
            res.status(403).json({
                ok: false,
                msg: 'Acceso denegado no posee privilegios de administrador'
            });
        }

        next();

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }

}

const AdminRoleValidate_CurrentUser = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            res.status(403).json({
                ok: false,
                msg: 'Acceso denegado no posee privilegios de administrador'
            });
        }

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }

}



module.exports = {
    JWTValidate,
    AdminRoleValidate,
    AdminRoleValidate_CurrentUser
}