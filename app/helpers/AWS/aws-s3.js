const fs = require('fs');
const path = require('path')
const AWS = require('aws-sdk');
const {S3Client,GetObjectCommand,PutObjectCommand} = require("@aws-sdk/client-s3")
const { resolve } = require('path');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const createHttpError = require('http-errors');


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}
})
var myBucket = 'sa-saas-assets-bucket';

// const s3 = new AWS.S3({
//     region: 'us-east-2',
//     accessKeyId: 'AKIATPTD3BHFJYIES7EC',
//     secretAccessKey: '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'
// });
async function getObjectUrl(key){
    const command = new GetObjectCommand({
        Bucket:"home-services-storage",
        Key:key
    })
    const url = getSignedUrl(s3Client,command,{expiresIn:20})
    return url;
}

async function getObjectUrl(key){
    const command = new GetObjectCommand({
        Bucket:"home-services-storage",
        Key:key
    })
    const url = await getSignedUrl(s3Client,command,{expiresIn:20})
    return url;
}
exports. putObjectUrl =  async function(contentType,folderName,imageName){
     


    const command = new PutObjectCommand({
        Bucket:"home-services-storage",
        Key:`uploads/${folderName}/${imageName}`,
        ContentType:contentType
    })
    const url = await getSignedUrl(s3Client,command,{expiresIn:60})
     
    if(url){

        return url;
    }else{
        throw createHttpError.RequestTimeout("Image can not upload")
    }
}
 



exports.uploadFile = function (file, key) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file.path, function (err, data) {
            if (err) {
                throw err;
            }
            console.log("data", data)
            params = { Bucket: myBucket, Key: key, Body: data, ACL: 'public-read', ContentType: file.mimetype };
            s3.putObject(params, function (err, data) {
                if (err) {
                    reject(err);
                    console.log(err)
                } else {
                    resolve(key);
                    console.log("Successfully uploaded data to myBucket/myKey" + data);
                }
            });
        });
    })
}

 
 


exports.deleteFile = function (delKey) {
    return new Promise((resolve, reject) => {
        let myKey = s3.deleteObject({
            Bucket: myBucket,
            Key: delKey
        }, function (err, data) { 
            if (err) {
                reject(err);
            } else {
                resolve(myKey);
            }
        })

    })

}





