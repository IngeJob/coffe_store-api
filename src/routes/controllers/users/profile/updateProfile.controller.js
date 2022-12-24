const User = require('../../../../models/User');
const bcrypt = require('bcryptjs');

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById ( req.userId ) || null;
    if(!user) {
      return res
        .status(401)
        .json({
          success: false,
          errorMsg: 'No existe el ususario o expiro token'
        })
    }

    const { fullname, username, password, phone } = req.body;

    if(username !== user.username){
      const usernameUser = await User.findOne({username});
      if(usernameUser){
        return res.json({
          success: false,
          errorMsg: 'Ya existe ese ususario',
        })
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    await User.findByIdAndUpdate( req.userId, {
      fullname, username, password: hash, phone
    } )

    res.json({
      success: true,
      msg: 'Se actualizo el perfil de ususario',
      fullname,
      username,
      phone
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al actualizar el perfil de ususario'
    })
  }  
}

module.exports = updateProfile


  