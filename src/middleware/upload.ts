import path from "path";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' 
            || file.mimetype == 'image/png')
            cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        let newName = Date.now() + path.extname(file.originalname);
        cb(null, newName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || 
        file.mimetype == 'image/png') {
        cb(null, true);
    } else cb(null, false);
    
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

export = upload;