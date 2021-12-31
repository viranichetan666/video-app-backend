/* eslint-disable import/prefer-default-export */
const { aws_access_key, aws_secret_key, bucket } = require('./../config/env-vars');

const { S3 } = require('aws-sdk');

const s3bucket = new S3({
  accessKeyId: aws_access_key,
  secretAccessKey: aws_secret_key,
  region: 'ap-south-1',
  signatureVersion: 'v4',
});

/**
 *
 * @param {String} foldername
 * @param {Buffer} file
 */
module.exports.uploadFilehandler = (foldername, file) => new Promise((resolve, reject) => {
  const params = {
    Bucket: `${bucket}/${foldername}`,
    Key: file.name,
    Body: file.data,
  };
  s3bucket.upload(params, (err, data) => {
    if (err) {
      return reject({ message: 'Error uploading file', status: 500 });
    }
    return resolve({ status: 200 });
  });
});

exports.getImageUrl = (type = "poster", filename) => {
  return `https://${bucket}.s3.ap-south-1.amazonaws.com/${type}/${filename}`;
}