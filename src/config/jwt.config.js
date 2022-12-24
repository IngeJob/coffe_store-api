const jwt = require('jsonwebtoken');

const getToken = (payload) => {
  return jwt.sign({
    data: payload,
    }, process.env.S_TOKEN,
    {expiresIn: '1h'}
  )
}

const getTokenData = ( token ) => {
  let userData = null;
  jwt.verify(token, process.env.S_TOKEN, (err, decoded) => {
    if(err) {
      console.log('Error al obtener data de token')
    } else {
      userData = decoded;
    }
  })
  return userData
}

module.exports = {
  getToken,
  getTokenData
}