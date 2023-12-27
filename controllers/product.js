const multer = require('multer');
const path = require('path');
const pool = require('../db/connection');

const uploadDir = path.join(__dirname, '../public/images');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

function createProduct(req, res){
  pool.getConnection((error, db)=>{
      if(error){
          return res.status(500).json({error: error});
      }
      db.query(`INSERT INTO product(title, body, price, date, seller) VALUES('${req.body.title}', '${req.body.body}', '${req.body.price}', '${req.body.date}', '${req.body.seller}')`, (error, result)=>{        
          if(error){
            db.release();
            return res.status(400).json({error: error});
          }
          db.query(`INSERT INTO image(link, pid) VALUES('${req.file.filename}', '${result.insertId}')`, (error)=>{
            db.release();    
            if(error) return res.status(400).json({error: error});
            return res.sendStatus(200);
          });
      });
  });
}

module.exports = {
  upload,
  createProduct
}