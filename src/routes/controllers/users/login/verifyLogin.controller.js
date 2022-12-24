const User = require('../../../../models/User')

const verifyToken = async  ( req, res ) => {
  try{
    const user = await User.findById ( req.userId ) || null;
    if(!user) {
      return res
        .status(401)
        .json({error: 'No existe el ususario'})
    }

    const { username, fullname, email, phone, condition, role, avatar } = user
    res.json({
        success: true,
        msg: 'Logeado',
        username,
        fullname,
        email,
        phone,
        condition,
        role,
        avatar
    })  

  } catch(error){
    console.log(error);
    return res.json({
      success: false,
      msg: 'Error al obtner token'
    })
  }
}

module.exports = verifyToken