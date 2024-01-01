const socketToUserMap = {};
const userToSocketMap = {};

function createSocketInfo(req, res){
    socketToUserMap[req.body.socketId] = req.decoded.userId;
    if(userToSocketMap[req.decoded.userId]){
        userToSocketMap[req.decoded.userId].push(req.body.socketId);
    }
    else{
        userToSocketMap[req.decoded.userId] = [req.body.socketId];
    }
}

console.log(socketToUserMap);

module.exports = {
    createSocketInfo,
    socketToUserMap,
    userToSocketMap
}