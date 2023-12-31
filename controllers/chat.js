const pool = require('../db/connection');

function getChatRoom(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT chatRoom.id, chatRoom.buyer, product.seller FROM chatRoom JOIN product ON chatRoom.pid = product.id WHERE chatRoom.buyer = '${req.decoded.userId}' OR product.seller = '${req.decoded.userId}'`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            var chatRooms = [];
            results.forEach(element => {
                chatRooms.push({roomId: element.id, partnerId: req.decoded.userId == element.buyer ? element.seller : element.buyer});
            });
            return res.status(200).json(chatRooms);
        });
    });
}

function getChat(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT message, date, status, sender FROM chat WHERE rid = '${req.query.roomId}' ORDER BY date DESC`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            var chats = [];
            results.forEach(element => {
                chats.push({message: element.message, date: element.date, status: element.status, isSender: eq.decoded.userId == element.sender ? true : false});
            });
            return res.status(200).json(chats);
        });
    });
}

module.exports = {
    getChatRoom,
    getChat
}