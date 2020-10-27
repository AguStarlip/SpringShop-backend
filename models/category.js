const { Schema, model } = require('mongoose');


const CategorySchema = Schema({

    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});


module.exports = model('Category', CategorySchema);