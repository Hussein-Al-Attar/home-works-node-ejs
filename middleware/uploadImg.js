const multer  = require('multer')
var path = require('path');
var storage = multer.diskStorage(
    {
        destination: './public/img/uploads',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            cb( null, Math.random()*100000000000000000+path.extname(file.originalname));
        }
    }
);
const upload = multer({ storage: storage })
module.exports=upload.single("uploaded_file");
   