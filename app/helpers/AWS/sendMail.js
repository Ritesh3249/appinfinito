const AWS = require( 'aws-sdk')
const nodemailer = require("nodemailer")
 // Set the region 

AWS.config.update({
    accessKeyId: process.env.API_KEY,
    secretAccessKey: process.env.API_SECRET_KEY,
    region: 'us-west-2'
});
// Create a transporter using your Zoho email SMTP settings
let transporter =  nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    auth: {
      user: "ritesh.gupta2249@gmail.com",
      pass: "jlfb plar xsbb ryav",
    },
  });


// Define the email data
exports.sendEmail = function(toEmail, htmlBody) {
    const mailOptions = {
      from: 'your_email@example.com',
      to: toEmail,
      subject: "ljbkbb",
      html: htmlBody
      // You can also use 'html' key for HTML content
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
  
// exports.sendMail = function (to, cc, subject, htmlBody, txtBody, from, replyTo) {
//   // Set the region 
//   AWS.config.update({ region: 'us-east-2' });
//   // console.log(htmlBody, txtBody)
//   var params = {
//       Destination: { /* required */
//           CcAddresses: cc,
//           // [
//           //     'EMAIL_ADDRESS',
//           //     /* more items */
//           // ],
//           ToAddresses: to,
//           // [
//           //     'EMAIL_ADDRESS',
//           //     /* more items */
//           // ]
//       },
//       Message: { /* required */
//           Body: { /* required */
//               Html: {
//                   Charset: "UTF-8",
//                   Data: htmlBody
//               },
//               Text: {
//                   Charset: "UTF-8",
//                   Data: txtBody
//               }
//           },
//           Subject: {
//               Charset: 'UTF-8',
//               Data: subject
//           }
//       },
//       Source: from, /* required */
//       ReplyToAddresses: [
//           replyTo,
//           /* more items */
//       ],
//   };

//   var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

//   // Handle promise's fulfilled/rejected states
//   sendPromise.then(
//       function (data) {
//           console.log("Email sent successfully.");
//       }).catch(
//           function (err) {
//               console.error(err, err.stack);
//           });
// }