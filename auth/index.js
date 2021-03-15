var jwt = require('jsonwebtoken');

require("dotenv").config({ path: ".env" });

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

//req, resp, next  
exports.getToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '12h' }, (err, token) => {
    console.log(token);
    return { token };
});

//pasar paramentros directamente
exports.getTokenData = jwt.sign(user = { user }, secretKey=process.env.SECRET_KEY, { expiresIn: tiempo = '12h' }, (err, token) => {
    console.log(token);
    return { token };
});