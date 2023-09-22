const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const JWT_SCERET = "sdfdsfdffvvsdkhbkasbdfhdvkhvgfdbkjdb";
const AuthenticationMiddleware = {
    authenticate: (req, res, next) => {
        try {
            let token = req.headers.authorization.split(" ")[1];
            let decodedToken = jwt.verify(token, JWT_SCERET);
            req.user = decodedToken;
            next();
        }
        catch (err) {
            return res.status(401).send("Invalid Token");
        }
    },
    generateToken: (user) => {
        let token = jwt.sign({
            userId: user._id,
            email: user.email,
            employeeName: user.employeeName,
            phoneNumber: user.phoneNumber,
            dob: user.dob,
            userName: user.userName,
        },
            JWT_SCERET, {
            expiresIn: "6h"
        });
        return token;
    }
}
module.exports = AuthenticationMiddleware;