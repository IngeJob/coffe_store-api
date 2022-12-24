const User = require('../../../../models/User');
const { getToken } = require('../../../../config/jwt.config');
const { getTemplate, sendEmail } = require('../../../../config/mail.config')


const resendConfirmEmail = async (req, res) => {
  try {
    const user = await User.findById ( req.userId ) || null;
    if(!user) {
      return res
        .status(401)
        .json({error: 'No existe el ususario'})
    }

    const { fullname, email, code } = user

    const token = getToken({ email, code });
    const template = getTemplate( fullname, token )
    await sendEmail( email, template  );

    res.json({
      success: true,
      msg: 'Se reenvió el correo de verificación de cuenta'
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al reenviar correo'
    })
  }  
}

module.exports = resendConfirmEmail


  