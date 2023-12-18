const bcrypt = require('bcrypt');
const pool = require('../db/connection');

function createUser(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        bcrypt.hash(JSON.stringify(req.body.pw), 10, (error, pw)=>{
            if(error) return res.status(400).json({error: error});
            db.query(`INSERT INTO user(id, password, name) VALUES(${JSON.stringify(req.body.id)}, '${pw}', '게스트')`, (error)=>{
                db.release();
                if(error) return res.status(400).json({error: error});
                return res.sendStatus(200);
            });
        });
    });
}

module.exports = {
    createUser
}