const pool = require('../db/connection');

function getLike(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT pid FROM wishList WHERE uid = '${req.decoded.userId}'`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            var likes = [];
            results.forEach(element => {
                likes.push({productId: element.pid});
            });
            return res.status(200).json(likes);
        });
    });
}

module.exports = {
    getLike
}