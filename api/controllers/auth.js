const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email });

        let user;

        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            userDB.google = true;
        }

        await user.save();

        const token = await JWTGenerate(user.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        });

    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await JWTGenerate(uid);

    const userDB = await User.findById(uid);

    res.json({
        ok: true,
        token,
        userDB
    });

}



module.exports = {
    login,
    googleSignIn,
    renewToken
}