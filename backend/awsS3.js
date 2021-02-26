const AWS = require('aws-sdk');

const Bucket = 'dee-tee-eff';

const multer = require('multer');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async file => {
  const { originalname, buffer: Body } = await file;
  const path = require('path');

  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket,
    Key,
    Body,
    ACL: 'public-read'
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Location;
};

const multiplePublicFileUpload = async files => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};

const singlePrivateFileUpload = async file => {
  const { originalname, buffer: Body } = await file;
  const path = require('path');

  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket,
    Key,
    Body
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Key;
};

const multiplePrivateFileUpload = async files => {
  return await Promise.all(
    files.map((file) => {
      return singlePrivateFileUpload(file);
    })
  );
};

const retrievePrivateFile = Key => Key && s3.getSignedUrl('getObject', { Bucket, Key });

const storage = multer.memoryStorage({
  destination: function (_req, _file, callback) {
    callback(null, '');
  }
});

const singleMulterUpload = nameOfKey => multer({ storage }).single(nameOfKey);
const multipleMulterUpload = nameOfKey => multer({ storage }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singlePrivateFileUpload,
  multiplePrivateFileUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload
};
