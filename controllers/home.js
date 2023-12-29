const pool = require('../db/connection');
const path = require('path');
const fs = require('fs');

function getUser(req, res){
    res.send(req.decoded);
}

function createChatRoom(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        db.query(`SELECT seller FROM product WHERE id = ${req.body.productId}`, (error, results)=>{           
            if(error){
                db.release();
                return res.status(400).json({error: error});
            }
            if(results[0].seller == req.decoded.userId){
                db.release();
                return res.status(400).json({error: "판매자와 구매자가 같습니다."});
            }
            db.query(`INSERT INTO chatRoom(buyer, pid, date) VALUES('${req.decoded.userId}', '${req.body.productId}', '${req.body.date}')`, (error)=>{
                db.release();
                if(error) return res.status(400).json({error: error});
                return res.sendStatus(200);
            });
        });
    });
}

function createLike(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        db.query(`SELECT seller FROM product WHERE id = ${req.body.productId}`, (error, results)=>{           
            if(error){
                db.release();
                return res.status(400).json({error: error});
            }
            if(results[0].seller == req.decoded.userId){
                db.release();
                return res.status(400).json({error: "판매자와 구매자가 같습니다."});
            }
            db.query(`INSERT INTO wishList(uid, pid) VALUES('${req.decoded.userId}', '${req.body.productId}')`, (error)=>{
                db.release();
                if(error) return res.status(400).json({error: error});
                return res.sendStatus(200);
            });
        });
    });
}

function getProduct(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT product.id, product.title, product.price, product.date, product.body, product.status, product.seller, image.link FROM product LEFT JOIN image ON product.id = image.pid ${req.query.lastId ? `WHERE id < ${req.query.lastId} ` : ""}ORDER BY id DESC LIMIT ${req.query.limit}`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            var products = [];
            results.forEach(element => {
                const imageExtension = element.link ? element.link.split('.').pop() : null;
                const imagePath = element.link ? path.join(__dirname, '../public/images', element.link) : null;
                const imageBuffer = element.link ? fs.readFileSync(imagePath) : null;
                products.push({productId: element.id, title: element.title, body: element.body, price: element.price, date: element.date, location: element.location, status: element.status, sellerId: element.seller, image: element.link ? imageBuffer.toString('base64') : null, extension: element.link ? imageExtension : null});
            });
            return res.status(200).json(products);
        });
    });
}

module.exports = {
    getUser,
    createChatRoom,
    createLike,
    getProduct
}