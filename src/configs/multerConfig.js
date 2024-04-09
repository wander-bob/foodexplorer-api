const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

const TEMP_FOLDER  = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TEMP_FOLDER, "uploads");
const MULTER = {
  storage: multer.diskStorage({
    destination: TEMP_FOLDER,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname.replace(/\s/,"_")}`;
      return callback(null, fileName);
    }
  })
}
module.exports = { TEMP_FOLDER, UPLOAD_FOLDER, MULTER};