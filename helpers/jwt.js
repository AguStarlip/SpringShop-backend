const jwt = require('jsonwebtoken');


const JWTGenerate = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '24h' }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Error al generar token');
            } else {
                resolve(token);
            }

        });

    });

}


module.exports = {
    JWTGenerate
}