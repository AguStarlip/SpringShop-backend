const { response } = require('express');
const User = require('../models/user');
const Product = require('../models/product');


const searchAll = async(req, res = response) => {

    const term = req.params.term;
    const regex = new RegExp(term, 'i')

    const [user, product] = await Promise.all([
        await User.find({ name: regex }),
        await Product.find({ name: regex })
    ]);

    res.json({
        ok: true,
        user,
        product
    });

}

const searchByCollection = async(req, res = response) => {

    const term = req.params.term;
    const table = req.params.table;
    const regex = new RegExp(term, 'i');

    let data = [];

    switch (table) {
        case 'users':
            data = await User.find({ name: regex });

            break;
        case 'products':
            data = await Product.find({ name: regex })
                .populate('user', 'name email img');

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser valida: users, products'
            });
            break;
    }

    res.json({
        ok: true,
        results: data
    });

}


module.exports = {
    searchAll,
    searchByCollection
}