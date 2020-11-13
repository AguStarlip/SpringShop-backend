const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
//const cloudinary = require('cloudinary').v2;
const { imageUpdate } = require('../helpers/image-update');
const fs = require('fs');
const path = require('path');

/* cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});*/

const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    const typeValidate = ['users', 'products'];
    if (!typeValidate.includes(type)) {
        res.status(400).json({
            ok: false,
            msg: 'El tipo debe ser valido: users, product'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe ningun archivo'
        });
    }

    const file = req.files.image;

    const splitName = file.name.split('.');
    const fileExt = splitName[splitName.length - 1];

    const extValidate = ['jpg', 'png', 'jpeg', 'gif'];
    if (!extValidate.includes(fileExt)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extension debe ser valida: jpg, png, jpeg, gif'
        });
    }

    const fileName = `${uuidv4()}.${fileExt}`;

    const path = `./uploads/${type}/${fileName}`;

    //const cloudinary_path = `springshop/uploads/${type}`;

    file.mv(path, (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        imageUpdate(type, id, fileName);

        /* cloudinary.uploader.upload(path, { folder: cloudinary_path, public_id: fileName }, (error, result) => {

            if (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    masg: 'Error al subir la imagen'
                });
            }

            console.log(result);
        }); */

        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName
        });
    });

}

const localImageRetrieve = (req, res = response) => {

    const type = req.params.type;
    const image = req.params.image;

    const pathLocalImage = path.join(__dirname, `../uploads/${type}/${image}`);

    if (fs.existsSync(pathLocalImage)) {
        res.sendFile(pathLocalImage);
    } else {
        const pathLocalNotImage = path.join(__dirname, `../uploads/Image_not_available.jpg`);
        res.sendFile(pathLocalNotImage);
    }

}

/* const cloudImageRetrieve = (req, res = response) => {

    const type = req.params.type;
    const image = req.params.image;

    const pathCloudImage = `springshop/uploads/${type}/${image}`;

    if (image !== 'not-found') {
        const cloudImage = cloudinary.image(pathCloudImage, { width: 500, height: 500, crop: "fill", cloud_name: "reslab-files", format: image, secure: "true" });
        res.send(cloudImage);
    } else {
        const cloudNotFoundImage = cloudinary.image('Image_not_available_ybdaaj.jpg', { width: 500, height: 500, crop: "fill", cloud_name: "reslab-files", secure: "true" });
        res.json({
            ok: false,
            cloudNotFoundImage
        });
    }

} */




module.exports = {
    fileUpload,
    localImageRetrieve,
    //cloudImageRetrieve
}