const socketToUserMap = new Map();
const userToSocketMap = new Map();

function createSocketInfo(req, res){
    socketToUserMap.set(req.body.socketId, req.decoded.userId);
    if(userToSocketMap.get(req.decoded.userId)){
        userToSocketMap.get(req.decoded.userId).push(req.body.socketId);
    }
    else{
        userToSocketMap.set(req.decoded.userId, [req.body.socketId]);
    }
}

module.exports = {
    createSocketInfo,
    socketToUserMap,
    userToSocketMap
}