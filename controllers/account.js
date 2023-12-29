const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

function createUser(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        bcrypt.hash(req.body.pw, 10, (error, pw)=>{
            if(error) return res.status(400).json({error: error});
            db.query(`INSERT INTO user(id, password, name) VALUES('${req.body.id}', '${pw}', '게스트')`, (error)=>{
                db.release();
                if(error) return res.status(400).json({error: error});
                return res.sendStatus(200);
            });
        });
    });
}

function getToken(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT password FROM user WHERE id = '${req.body.id}'`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            if(!results.length) return res.status(404).json({error: "등록되지 않은 id 입니다."});
            bcrypt.compare(req.body.pw, results[0].password, (error, same)=>{
                if(error) return res.status(500).json({error: error});
                if(!same) return res.status(400).json({error: "비밀번호가 일치하지 않습니다."});

                const key = 'key'; //환경변수로 바꿔줘야 함
                const token = jwt.sign(
                    {
                        userId: req.body.id
                    },
                    key,
                    {
                        expiresIn: "2h"
                    }
                );

                return res.status(200).json({token: token});
            });
        });
    });
}

module.exports = {
    createUser,
    getToken
}