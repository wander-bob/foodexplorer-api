const fs = require("node:fs");
const path = require("node:path");
const multerConfig = require("../configs/multerConfig");

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(multerConfig.TEMP_FOLDER, file),
      path.resolve(multerConfig.UPLOAD_FOLDER, file)
    );
    return file;
  }
  async deleteFile(file){
    const filePath = path.resolve(multerConfig.UPLOAD_FOLDER, file);
    try{
      await fs.promises.stat(filePath);
    }catch(error){
      return console.log(error);
    }
    await fs.promises.unlink(filePath);
  }
}
module.exports = DiskStorage;