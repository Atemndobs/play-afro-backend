import multer from "multer";
import fs from "fs";
/**
 * @description : file upload middleware for request.
 * @param {obj} req : request of route.
 * @param {obj} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 * @param {string} destination : destination.
 * @param {string} filename : filedname.
 */
const storeDiffFiles =
  (destination, filename, single = "single") =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      var storage = multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, destination);
        },
        filename: function (req, file, callback) {
          console.log(file);
          if (file.originalname.length > 6)
            callback(
              null,
              file.fieldname +
                "-" +
                Date.now() +
                file.originalname.substr(
                  file.originalname.length - 6,
                  file.originalname.length
                )
            );
          else
            callback(
              null,
              file.fieldname + "-" + Date.now() + file.originalname
            );
        },
      });
    })
      .then(() => next())
      .catch((err) => {
        res.send({ error: err });
      });
  };

export default storeDiffFiles;
