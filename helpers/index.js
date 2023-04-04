const nodemailer = require('nodemailer');

exports.sendEmail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'seaaralee@gmail.com',
            pass: 'vfqyfdpplfnbltqz',
        }
    });
    return(
        transporter.sendMail(dataEmail)
        .then(info => console.log(`Email Sended! ${info.message}`))
        .catch(err => console.log(`Error! ${err}`))
    )
}