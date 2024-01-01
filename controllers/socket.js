const {insertMap} = require('../app');

function createSocketInfo(req, res){
    insertMap(req.body.socketId, req.decoded.userId);
}

module.exports = {
    createSocketInfo
}