import jwt from 'jsonwebtoken';

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

function getToken(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        if(error) return res.status(400).json({error: error});
        db.query(`SELECT password FROM user WHERE id = ${JSON.stringify(req.body.id)}`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            
            const key = 'key'; //환경변수로 바꿔줘야 함
            const id = JSON.stringify(req.body.id);
            const token = jwt.sign(
                {
                    userId: id
                },
                key,
                {
                    expiresIn: "10m"
                }
            );

            return res.status(200).json({token: token});
        });
    });
}

module.exports = {
    createUser,
    getToken
}