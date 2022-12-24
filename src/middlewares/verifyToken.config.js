const { getTokenData } = require('../config/jwt.config')

const verifyToken = async  ( req, res, next ) => {
  try{
    const token = req.header('token')
    if(!token) {
      return res
        .status(401)
        .json({error: 'Acceso denegado'})
    }

    const userData = getTokenData(token)
    if(userData){
      req.userId = userData.data._id
      req.role = userData.data.role
    }
    next()
  } catch(error){
    console.log(error);
    return res.json({
      success: false,
      msg: 'Error al obtener la data'
    })
  }
}

module.exports = verifyToken