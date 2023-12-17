const db = require('../db/connection');

function createUser(req, res){
    db.connect((error)=>{
        if(error){
            db.end();
            return res.status(500).json({error: error});
        }
        db.query(`INSERT INTO user(id, password, name) VALUES('user2', '232', '게스트')`, (error)=>{
            db.end();
            if(error) return res.status(400).json({error: error});
            return res.sendStatus(200);
        })
    })
}

module.exports = {
    createUser
}