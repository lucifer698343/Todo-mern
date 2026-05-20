const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {

        res.status(401);
        throw new Error('Token not provided');
    }

    try {

        const decoded = jwt.verify(
            token.split(' ')[1],
            process.env.Secret_key
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401);
        throw new Error('Invalid token');
    }
};

module.exports = authMiddleware;