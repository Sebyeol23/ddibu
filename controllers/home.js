const pool = require('../db/connection');
const path = require('path');
const fs = require('fs');
const {io} = require('../app');

function getUser(req, res){
    res.send(req.decoded);
}

function getChatRoom(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        db.query(`SELECT seller FROM product WHERE id = '${req.query.productId}'`, (error, results)=>{
            if(error){
                db.release();
                return res.status(400).json({error: error});
            }
            if(results[0].seller == req.decoded.userId){
                db.release();
                return res.status(400).json({error: "판매자와 구매자가 같습니다."});
            }
            db.query(`SELECT chatRoom.id, product.seller FROM chatRoom JOIN product ON chatRoom.pid = product.seller WHERE chatRoom.buyer = '${req.decoded.userId}' AND chatRoom.pid = '${req.query.productId}'`, (error, results)=>{           
                if(error){
                    db.release();
                    return res.status(400).json({error: error});
                }
                return res.status(200).json({roomId: results.length ? results[0].id : null});
            });
        });
    });
}

function createChatRoom(req, res){
    pool.getConnection((error, db)=>{
        if(error){
            return res.status(500).json({error: error});
        }
        db.query(`INSERT INTO chatRoom(buyer, pid, date) VALUES('${req.decoded.userId}', ${req.body.productId}, '${req.body.date}')`, (error, results)=>{
            if(error){
                db.release();
                return res.status(400).json({error: error});
            }
            db.query(`INSERT INTO chat(message, date, status, rid, sender) VALUES('${req.body.message}', '${req.body.date}', 0, ${results.insertId}, '${req.decoded.userId}')`, (error)=>{
                db.release();
                if(error) return res.status(400).json({error: error});
                io.on('connection', (socket) => {
                    io.emit('newChatRoom', results.insertId);
                });
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
        db.query(`SELECT product.id, product.title, product.price, product.date, product.body, product.status, product.seller, image.link FROM product LEFT JOIN image ON product.id = image.pid ${req.query.lastId ? `WHERE product.id < ${req.query.lastId} ` : ""}ORDER BY product.id DESC LIMIT ${req.query.limit}`, (error, results)=>{
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

function getProductInfo(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT product.id, product.title, product.price, product.date, product.body, product.status, product.seller, image.link FROM product LEFT JOIN image ON product.id = image.pid WHERE product.id = ${req.query.productId}`, (error, results)=>{
            db.release();
            if(error) return res.status(400).json({error: error});
            if(!results.length) return res.status(404).json({error: "상품이 없습니다."});
            const element = results[0]
            const imageExtension = element.link ? element.link.split('.').pop() : null;
            const imagePath = element.link ? path.join(__dirname, '../public/images', element.link) : null;
            const imageBuffer = element.link ? fs.readFileSync(imagePath) : null;
            const productInfo = {
                productId: element.id, 
                title: element.title, 
                body: element.body, 
                price: element.price, 
                date: element.date, 
                location: element.location, 
                status: element.status, 
                sellerId: element.seller, 
                image: element.link ? imageBuffer.toString('base64') : null, 
                extension: element.link ? imageExtension : null
            };
            return res.status(200).json(productInfo);
        });
    });
}

module.exports = {
    getUser,
    getChatRoom,
    createChatRoom,
    createLike,
    getProduct,
    getProductInfo
}