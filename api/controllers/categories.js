const { response } = require('express');
const Category = require('../models/category');


const getCategories = async(req, res = response) => {

    const [categories, total] = await Promise.all([
        Category.find({}, 'description')
        .populate('user', 'name email img'),

        Category.countDocuments()
    ]);

    res.json({
        ok: true,
        categories,
        category_records: total
    });

}

const getCategoryId = async(req, res = response) => {

    const id = req.params.id;

    const categoryDB = await Category.findById(id)
        .populate('product', 'name unitPrice brand description img')
        .populate('user', 'name email img')

    if (!categoryDB) {
        res.status(404).json({
            ok: false,
            msg: 'No existe una categoria con ese id'
        });
    }

    res.json({
        ok: true,
        category: categoryDB
    });

}

const createCategory = async(req, res = response) => {

    const uid = req.uid;
    const { description } = req.body;
    const category = new Category({
        user: uid,
        ...req.body
    });

    try {

        const categoryExist = await Category.findOne({ description });

        if (categoryExist) {
            res.status(404).json({
                ok: false,
                msg: 'Ya existe una categoria con el nombre ' + description
            });
        } else {
            await category.save();

            res.json({
                ok: true,
                category
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

const updateCategory = async(req, res = response) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const categoryDB = await Category.findById(id);

        if (!categoryDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }

        const changeCategory = {
            user: uid,
            ...req.body
        }

        const updateCategoryDB = await Category.findByIdAndUpdate(id, changeCategory, { new: true });

        res.json({
            ok: true,
            category: updateCategoryDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}

const deleteCategory = async(req, res = response) => {

    const id = req.params.id;

    try {

        const categoryDB = await Category.findById(id);

        if (!categoryDB) {
            res.json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }

        await Category.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Categoria borrada'
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
    getCategories,
    getCategoryId,
    createCategory,
    updateCategory,
    deleteCategory
}