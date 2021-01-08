const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'eb78ac73e741b6',
    pass: '5a38c5819645d8'
  }
})