const User = require('../../../../models/User');
const { getToken } = require('../../../../config/jwt.config');

const userLogin = async (req, res) => {
  try{
    const { username_email, password } = req.body
    const emailLogin = await User.findOne({email: username_email});
    const usernameLogin = await User.findOne({username: username_email})
    const user = emailLogin || usernameLogin
    if (!user){
      return res
        .status(202)  
        .json({
          success: false,        
          errorMsg: 'No existe correo/ususario',
        })
    } 

    const match = await user.matchPassword(password);
    if(!match){
      return res
        .status(202)
        .json({
          success: false,
          errorMsg: 'Contraseña inválida',
        })
    } else {
      const { username, fullname, email, phone, condition, role, avatar, code, _id } = user
      const token = getToken({ _id, code, role });
      res
        .json({
          success: true,
          token: token,
          msg: 'Ingreso correctamente',
          username,
          fullname,
          email,
          phone,
          condition,
          role,
          avatar
      })  
    }
     
  } catch (error){
    console.log(error);
    return res
      .status(202)  
      .json({
        success: false,
        errorMsg: 'Error al iniciar sesión'
      })
  }
}

module.exports = userLogin