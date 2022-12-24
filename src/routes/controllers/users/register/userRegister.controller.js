const User = require('../../../../models/User');
const { v4: uuidv4 } = require('uuid');
const { getToken } = require('../../../../config/jwt.config');
const { getTemplate, sendEmail } = require('../../../../config/mail.config')


const userRegister = async (req, res) => {
  try {
    const { fullname, username, email, password, phone } = req.body
    const emailUser = await User.findOne({email});
    const usernameLogin = await User.findOne({username})
    if(emailUser){
      return res.json({
        success: false,
        errorMsg: 'Ya existe el correo',
      })
    }
    if(usernameLogin){
      return res.json({
        success: false,
        errorMsg: 'Ya existe el ususario',
      })
    }

    const code = uuidv4();

    const newUser = new User ({ fullname, username, email, password, phone, code })
    newUser.password = await newUser.encryptPassword(password);

    const token = getToken({ email, code });
    const template = getTemplate( fullname, token )
    await sendEmail( email, template  );

    await newUser.save();

    res.json({
      success: true,
      msg: 'Se registro el ususario'
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al registrar'
    })
  }  
}

module.exports = userRegister


  