const Category = require('../../../../models/Category');

const getCategories = async (req, res) => {
  try{
    const categories = await Category.find({});
      res
        .json({
          success: true,
          msg: 'Ingreso correctamente',
          data: categories
      })       
  } catch (error){
    console.log(error);
    return res
      .status(202)  
      .json({
        success: false,
        errorMsg: 'Error al obtener categorias'
      })
  }
}

module.exports = getCategories