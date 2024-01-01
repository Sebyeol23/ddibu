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
        db.query(`SELECT id, message, date, status, sender FROM chat WHERE rid = '${req.query.roomId}' ORDER BY id`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            var chats = [];
            results.forEach(element => {
                chats.push({id: element.id, message: element.message, date: element.date, status: element.status, isSender: req.decoded.userId == element.sender ? true : false});
            });
            return res.status(200).json(chats);
        });
    });
}

function createChat(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        db.query(`INSERT INTO chat(message, date, status, rid, sender) VALUES('${req.body.message}', '${req.body.date}', 0, ${req.body.roomId}, '${req.decoded.userId}')`, (error)=>{
            if(error){
                db.release();
                return res.status(400).json({error: error});
            }
            db.query(`SELECT chatRoom.buyer, product.seller FROM chatRoom JOIN product ON chatRoom.pid = product.id WHERE chatRoom.id = ${req.body.roomId}`, (error, results)=>{
                db.release();
                if(error) return res.status(400).json({error: error});
                req.io.to(results[0].buyer).to(results[0].seller).emit('newChat');
                return res.sendStatus(200);
            });
        });
    });
}

module.exports = {
    getChatRoom,
    getChat,
    createChat
}