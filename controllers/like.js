const pool = require('../db/connection');
const path = require('path');
const fs = require('fs');

function getLike(req, res){
    pool.getConnection((error, db)=>{
        if(error) return res.status(500).json({error: error});
        db.query(`SELECT product.id, product.title, product.price, product.date, product.body, product.status, product.seller, image.link FROM wishList JOIN product ON wishList.pid = product.id LEFT JOIN image ON product.id = image.pid WHERE uid = '${req.decoded.userId}' ${req.query.lastId ? `AND product.id < ${req.query.lastId} ` : ""}ORDER BY product.id DESC LIMIT ${req.query.limit}`, (error, results)=>{
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
    getLike
}