const User = require('../../../../models/User');
const { getTokenData } = require('../../../../config/jwt.config');

const confirmEmail = async (req, res) => {
  try{
    const { token } = req.params;
    const userData = await getTokenData(token);

    if(userData === null){
      return res.json({
        success: false,
        msg: 'Error al obtener data'
      })
    }

    const { email, code } = userData.data;

    const user = await User.findOne({ email }) || null;
    if(user === null){
      return res.json({
        success: false,
        msg: 'Usuario no existe'
      })
    }

    if(code !== user.code){
      return res.redirect('/error.html')
    }

    user.condition='VERIFIED';
    await user.save();
    console.log('Usuario verificado')
    res.redirect('http://localhost:3000/auth/login')

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      msg: 'Error al confirmar correo'
    })
  } 
}

module.exports =  confirmEmail 