const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hshn6677@gmail.com',
    pass: 'wmowwxfwonmzqzck'
  }
});

let mailOptions = {
  from: 'hshn6677@gmail.com',
  to: 'fitriahshnaa@gmail.com',
  subject: 'Sending email using Node.js',
  text: 'halo'
}

transporter.sendMail(mailOptions, function(error, info) {
  if(error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})