const Category = require('../../../../models/Category');

const postCategory = async (req, res) => {
  try {
    const role = await User.findById ( req.role ) || null;
    if(!(role === 'MANAGER')) {
      return res
        .status(401)
        .json({error: 'Acceso no autorizado'})
    }
    const { name, image } = req.body
    const nameCategory = await Category.findOne({name});

    if(nameCategory){
      return res.json({
        success: false,
        errorMsg: 'Ya existe ese nombre de categoria',
      })
    }
    const newCategory = new Category ({ name, image })
    await newCategory.save();

    res.json({
      success: true,
      msg: 'Se registro la nueva categoria'
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al crear categoria'
    })
  }  
}

module.exports = postCategory


  