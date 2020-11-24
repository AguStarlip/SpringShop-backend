const User = require('../models/user');
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');


const imageDelete = (path) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }

}

const imageUpdate = async(type, id, fileName) => {

    let oldPath = ''

    switch (type) {
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('No existe imagen de usuario');
                return false;
            }
            oldPath = path.resolve(__dirname, `./uploads/${type}/${user.img}`);
            imageDelete(oldPath);
            user.img = fileName;
            await user.save();
            return true;

            break;

        case 'products':
            const product = await Product.findById(id);
            if (!product) {
                console.log('No existe imagen de producto');
                return false;
            }
            oldPath = path.resolve(__dirname, `./uploads/${type}/${product.img}`);
            imageDelete(oldPath);
            product.img = fileName;
            await product.save();
            return true;

            break;
        default:
            break;
    }

}


module.exports = {
    imageUpdate
}