const Category = require('../../../../models/Category');

const getProductsByCategories = async (req, res) => {
  try{
    const categories = await Category.find({}).populate('listProducts');
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

module.exports = getProductsByCategories