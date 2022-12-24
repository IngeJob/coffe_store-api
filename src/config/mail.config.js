const nodemailer = require("nodemailer");
require('dotenv').config();

const mail = {
  user: process.env.EMAIL_CONFIRM,
  pass: process.env.PASS_CONFIRM
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls:{
    rejectUnauthorized: false
  },
  auth: {
    user: mail.user,
    pass: mail.pass, 
  },
});

const sendEmail = async (email, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: `Coffee Store <${mail.user}>`,
      to: email,
      subject: 'Verificación de correo para Coffe Store',
      text: "Saludos",
      html
    });
    console.log('Correo enviado')
  } catch (error) {
    console.log('Error al enviar el correo: ', error)
  }
}

const getTemplate = ( fullname, token ) => {
  return`
  <head>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <style type="text/css">
    body{background-color: #F6EBDA;margin: 0px;}
  </style>
  <body>
    <table border="0" width="80%" style="margin:auto;padding:30px;background-color: #F6EBDA;">
      <tr>
        <td>
          <table border="0" width="100%">
            <tr>
              <td>
                <img style="width:5rem;" src="https://res.cloudinary.com/dxb5m6akt/image/upload/v1671742644/coffee_store_assets/logo_coffe_uklheo.jpg" alt="Logo">
              </td>
              <td>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td>
          <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
            <tr>
              <td style="background-color:#94702A;font-size:25px;color:#fff;">
                <h4 style="padding:0;">Coffe Store</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h1 style="padding-top:25px;">Confirmar Registro</h1>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding:0px 30px;">
                  ¡Bienvido ${fullname} a Coffe Store!, da click
                  en el botón de abajo para verificar
                  tu correo y continuar con tu pedido
                </p>
              </td>
            </tr>
            <tr style="display:flex;justify-content: center;">
              <td style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px;border: 0;color:#fff;background-color:#2F2105; ">        
                <a href="http://localhost:5000/users/confirm/${token}" target="_blank" style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                  Validar correo
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td>
          <table border="0" width="100%" style="border-radius: 5px;text-align: center;">        
            <tr>
              <td>
                <div style="margin-top: 20px;">
                  <span style="font-size:12px;">Copyright &copy; 2021 Coffee Store</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
}

module.exports = {
  sendEmail,
  getTemplate
}