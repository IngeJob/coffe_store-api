const User = require('../../../../models/User');
const {uploadImage, deleteImage} = require('../../../../utils/clodinary')
const fs = require('fs-extra')

const updateAvatar = async (req, res) => {
  try {
    const { username } = req.body
    const { tempFilePath } = req.files.image

    const user = await User.findOne({username})
    
    //si ya tiene foto de perfil borra la anterior
    if(user.avatar.userAvatar){
      await deleteImage(user.avatar.public_id)
    }

    const result = await uploadImage(tempFilePath)
    const { secure_url, public_id } = result
    
    await fs.unlink(tempFilePath)
    const update = {
      "$set": {
        "avatar.public_id" : public_id,
        "avatar.secure_url" : secure_url,
        "avatar.userAvatar" : true,
      }
    }
    await User.findByIdAndUpdate( user._id, update)

    res.json({
      success: true,
      newAvatar: secure_url,
      msg: 'Se actualizo el avatar'
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al actualizar avatar'
    })
  }  
}

module.exports = updateAvatar


  