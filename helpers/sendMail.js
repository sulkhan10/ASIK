const nodemailer = require('nodemailer')

let sendMail = (email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hshn6677@gmail.com',
      pass: 'wmowwxfwonmzqzck'
    }
  });
  
  let mailOptions = {
    from: '"Fitria CEO ASIK" <hshn6677@gmail.com>',
    to: email,
    subject: 'Thanks for joining ASIK',
    text: 'Dear Customer, thanks for joining our application, we hope we can bring joy and happiness to you'
  }
  
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

// sendMail('sulkhangalangsakti@gmail.com')
// sendMail('fitriahshnaa@gmail.com')

module.exports = sendMail