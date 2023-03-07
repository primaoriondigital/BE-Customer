const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const config = require('../config/email')

const OAuth2_client = new OAuth2(config.clientId,config.clientSecret)
OAuth2_client.setCredentials({refresh_token : config.refreshToken})

function send_mail(name, recipient,otp) {
    const accessToken = OAuth2_client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.user,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken:  accessToken
        }
    })

    const mail_options = {
        from: `KILAPIN <${config.user}>`,
        to: recipient,
        subject: 'your OTP number',
        html: get_html_message(name,otp)
    }
    transport.sendMail(mail_options,function(error,result) {
        if (error) {
            console.log('Error: ', error)
        } else {
            console.log('Success: ', result)
        }
        transport.close()
    })
}

function get_html_message(name,otp) {
    return `
        <h1>${otp}</h1>
        <h3>${name} thank's to use our Apps </h3>    
    `
}

// send_mail('yanto', 'xebinob176@gpipes.com')

module.exports = {send_mail}