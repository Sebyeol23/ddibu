const pool = require('../db/connection');

function getChatRoom(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT chatRoom.id FROM chatRoom JOIN product ON chatRoom.pid = product.id WHERE chatRoom.buyer = '${req.decoded.userId}' OR product.seller = '${req.decoded.userId}'`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            console.log(results);
            return res.sendStatus(200);
        });
    });
}

module.exports = {
    getChatRoom
}