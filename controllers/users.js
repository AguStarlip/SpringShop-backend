const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const getUser = async(req, res = response) => {

    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 5;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img status')
        .skip(from)
        .limit(to),

        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        user_records: total
    });

}

const createUser = async(req, res = response) => {

    const { email, password, name } = req.body;

    try {

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }

        const user = new User(req.body);

        const salt = await bcrypt.genSaltSync();
        user.password = await bcrypt.hashSync(password, salt);

        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }
}

const updateUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + uid
            });
        }

        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                res.status(400).json({
                    ok: false,
                    msg: 'El email ya está registrado'
                });
            }
        }

        if (!userDB.google) {
            fields.email = email;
        } else if (userDB.email !== email) {
            res.status(400).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar su email'
            });
        }

        const updateUserDB = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updateUserDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }
}

const changeStatusUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id ' + uid
            });
        }

        const { name, email, img, role, google, ...statusField } = req.body;

        const updateStatusUserDB = await User.findByIdAndUpdate(uid, statusField, { new: true });

        res.json({
            ok: true,
            user: updateStatusUserDB
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }
}

const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + uid
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario borrado'
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
    getUser,
    createUser,
    updateUser,
    changeStatusUser,
    deleteUser
}