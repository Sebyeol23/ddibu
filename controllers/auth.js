const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const key = 'key'; //환경변수로 바꿔줘야 함
    try {
        req.decoded = jwt.verify(req.headers.authorization, key);
        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") return res.status(419).json({error: error});
        if (error.name === "JsonWebTokenError") return res.status(401).json({error: error});
        return res.status(500).json({error: error});
    }
}

module.exports = {
    auth
}