const { response } = require('express');
const Product = require('../models/product');


const getProducts = async(req, res = response) => {

    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 5;

    const [products, total] = await Promise.all([

        Product.find({}, 'name unitPrice description stock img category user')
        .populate('user', 'name img')
        //.populate('category','description')
        .skip(from)
        .limit(to),

        Product.countDocuments()
    ]);

    res.json({
        ok: true,
        products,
        product_records: total
    });

}

const getProductId = async(req, res = response) => {

    const id = req.params.id;

    const product = await Product.findById(id, 'name brand unitPrice description stock img category user');

    res.json({
        ok: true,
        product
    });

}

const createProduct = async(req, res = response) => {

    const uid = req.uid;
    const { name } = req.body;
    const product = new Product({
        user: uid,
        ...req.body
    });

    try {

        const productExist = await Product.findOne({ name });

        if (productExist) {
            res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con el nombre ' + name
            });
        } else {
            const productDB = await product.save();

            res.json({
                ok: true,
                product: productDB
            });
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }
}

const updateProduct = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {

        const productDB = await Product.findById(id);

        if (!productDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        const changeProduct = {
            user: uid,
            ...req.body
        }

        const updateProductDB = await Product.findByIdAndUpdate(id, changeProduct, { new: true });

        res.json({
            ok: true,
            product: updateProductDB
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }
}

const updateStockProduct = async(req, res = responsees) => {

    const id = req.params.id;
    const uid = req.uid;
    const stock = req.body.stock;

    try {

        const productDB = await Product.findById(id);

        if (!productDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        const changeStockProduct = {
            user: uid,
            stock: stock
        }

        const updateStockProductDB = await Product.findByIdAndUpdate(id, changeStockProduct, { new: true });

        res.json({
            ok: true,
            product: updateStockProductDB
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });

    }
}

const deleteProduct = async(req, res = response) => {

    const id = req.params.id;

    try {

        const productDB = await Product.findById(id);

        if (!productDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        await Product.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Producto borrado'
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
    getProducts,
    getProductId,
    createProduct,
    updateProduct,
    updateStockProduct,
    deleteProduct
}