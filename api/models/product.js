const { Schema, model } = require('mongoose');
const { stringify } = require('uuid');


const ProductSchema = Schema({

    name: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    unitPrice: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    description: {
        type: String,
    },
    stock: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});


module.exports = model('Product', ProductSchema);