const pool = require('../db/connection');

function getUser(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT name, location FROM user WHERE id = '${req.decoded.userId}'`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            if(!results.length) return res.status(404).json({error: "등록되지 않은 id 입니다."});
            return res.status(200).json({id: req.decoded.userId, name: results[0].name, location: results[0].location});
        });
    });
}

function updateUser(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`UPDATE user SET name = '${req.body.newName}', location = ${req.body.newLocation ? `${req.body.newLocation}` : 'NULL'} WHERE id = '${req.decoded.userId}'`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            return res.sendStatus(200);
        });
    });
}

module.exports = {
    getUser,
    updateUser
}