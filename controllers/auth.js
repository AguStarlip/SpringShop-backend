const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWTGenerate } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no valido'
            });
        }

        const validPasswordDB = bcrypt.compareSync(password, userDB.password);

        if (!validPasswordDB) {
            res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no valido'
            });
        }

        const token = await JWTGenerate(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}



module.exports = {
    login
}